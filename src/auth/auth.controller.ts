import { Controller, Request, Post, UseGuards, Body, HttpCode } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiServiceUnavailableResponse, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @ApiUnauthorizedResponse()
    @ApiOkResponse()
    @Post('login')
    @HttpCode(200)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @ApiCreatedResponse()
    @ApiServiceUnavailableResponse()
    @ApiUnprocessableEntityResponse()
    @Post('register')
    create(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
