import { Injectable, NotFoundException, ServiceUnavailableException, UnprocessableEntityException } from '@nestjs/common';
import { RegisterDto } from '../auth/dtos/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserData } from './interfaces/user.interface';
import { Picture } from './../pictures/entities/picture.entity';
import { PictureLike } from './../pictures/entities/picture-like.entity';

@Injectable()
export class UserService {
  async register(registerDto: RegisterDto): Promise<UserData> {
    await this.validateUsernameUniqueness(registerDto.username);

    const user = await User.create({
      ...registerDto,
      password: this.hashPassword(registerDto.password)
    });
    return this.formatUserInfo(user);
  }

  async findAll(): Promise<User[]> {
    return await User.scope('excludeHidden').findAll();
  }

  async findOne(id: number): Promise<UserData> {
    const user = await this.findOneActiveById(id);
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return this.formatUserInfo(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneActiveById(id);
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    if (updateUserDto.password) {
      updateUserDto.password = this.hashPassword(updateUserDto.password);
    }

    await user.update(updateUserDto);
  }

  async remove(id: number): Promise<void> {
    const user = await User.findOne({
      where: { id },
      include: [{
        model: Picture
      },
      {
        model: PictureLike
      }]
    });
    if (!user) {
      throw new NotFoundException("User not found.");
    }

    if (user.pictures.length > 0 || user.pictureLikes.length > 0) {
      throw new UnprocessableEntityException("Cannot delete user. Please delete pictures / likes.");
    }
    await user.destroy();
  }

  findOneActiveById(id: number): Promise<User | undefined> {
    return User.scope('excludeHidden').findOne({ where: { id, isActive: true } });
  }

  findOneActiveByUsername(username: string): Promise<User | undefined> {
    return User.findOne({ where: { username, isActive: true } });
  }

  formatUserInfo(user: User): UserData {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      isActive: user.isActive
    };
  }

  private async validateUsernameUniqueness(username: string): Promise<void> {
    const existing = await User.findOne({ where: { username } });
    if (existing !== null) {
      throw new UnprocessableEntityException("Username is not unique.");
    }
  }

  private hashPassword(password: string): string {
    try {
      const hash = bcrypt.hashSync(password, 10);
      return hash;
    } catch (error) {
      throw new ServiceUnavailableException('bcrypt module hashSync() has failed');
    }
  }
}
