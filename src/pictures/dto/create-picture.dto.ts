import { ArrayMaxSize, IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePictureDto {
    @IsNotEmpty()
    @MaxLength(255)
    @IsString()
    title: string;

    @IsOptional()
    @MaxLength(255)
    @IsString()
    description: string;

    @IsOptional()
    @IsString({ each: true })
    @IsArray()
    @ArrayMaxSize(10)
    tags: string[];
}
