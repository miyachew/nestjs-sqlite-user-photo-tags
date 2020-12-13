import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(255)
    @IsString()
    name: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    @IsAlphanumeric()
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(30)
    @IsString()
    password: string;
}
