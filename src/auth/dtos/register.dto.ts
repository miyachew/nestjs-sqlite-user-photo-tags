import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(255)
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    @IsAlphanumeric()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(30)
    @IsString()
    password: string;
}
