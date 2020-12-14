import { Controller, Get, Request, Body, Put, Param, Delete, HttpCode, UseGuards, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiNoContentResponse, ApiNotFoundResponse, ApiServiceUnavailableResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiNotFoundResponse()
  @ApiServiceUnavailableResponse()
  @ApiNoContentResponse()
  @HttpCode(204)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  @ApiNoContentResponse()
  @HttpCode(204)
  remove(@Param('id') id: string, @Request() req) {
    if (req.user.id === +id) {
      throw new ForbiddenException("Cannot delete yourself.");
    }
    return this.userService.remove(+id);
  }
}
