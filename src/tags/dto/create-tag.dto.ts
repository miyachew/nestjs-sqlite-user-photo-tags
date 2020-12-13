import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTagDto {
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    name: string;
}
