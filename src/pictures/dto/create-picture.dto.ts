import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ArrayMaxSize, IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePictureDto {
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    @IsString()
    title: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(255)
    @IsString()
    description: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ each: true })
    @IsArray()
    @ArrayMaxSize(10)
    tags: string[];
}
