import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/entities/user.entity';
import { UserLoginResponse, UserRegisterResponse } from 'src/users/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneActiveByUsername(username);
        if (user && this.compareHash(pass, user.password)) {
            return {
                id: user.id,
                username: user.username,
                isActive: user.isActive
            };
        }
        return null;
    }

    login(user: User): UserLoginResponse {
        const payload = { username: user.username, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }

    async register(registerDto: RegisterDto): Promise<UserRegisterResponse> {
        const user = await this.userService.register(registerDto);
        const payload = { username: user.username, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
            user
        };
    }

    compareHash(password: string, hash: string): boolean {
        try {
            const isPasswordCorrect = bcrypt.compareSync(password, hash);
            return isPasswordCorrect;
        } catch (error) {
            throw new ServiceUnavailableException('bcrypt module compareSync() has failed');
        }
    }
}
