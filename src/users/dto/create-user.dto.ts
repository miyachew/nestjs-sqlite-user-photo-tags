import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
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
