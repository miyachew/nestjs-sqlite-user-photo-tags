import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddPictureTagDto {
    @ApiProperty()
    @IsString()
    tag: string;
}
