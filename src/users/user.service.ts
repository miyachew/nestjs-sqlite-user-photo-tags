import { Injectable, NotFoundException, ServiceUnavailableException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    await this.validateUsernameUniqueness(createUserDto.username);

    const { password, ...user } = await User.create({
      ...createUserDto,
      password: this.hashPassword(createUserDto.password)
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    return await User.scope('excludeHidden').findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.findOneActiveById(id);
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return user;
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
    const user = await this.findOneActiveById(id);
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    await user.destroy();
  }

  findOneActiveById(id: number): Promise<User | undefined> {
    return User.scope('excludeHidden').findOne({ where: { id, isActive: true } });
  }

  findOneActiveByUsername(username: string): Promise<User | undefined> {
    return User.findOne({ where: { username, isActive: true } });
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
