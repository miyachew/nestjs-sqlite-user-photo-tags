import { Module } from '@nestjs/common';
import { UserModule } from './../users/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from './../config/config.service';
import { ConfigModule } from './../config/config.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.register({ folder: './config' }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.register({ folder: './config' })],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') }
        };
      },
      inject: [ConfigService]
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
