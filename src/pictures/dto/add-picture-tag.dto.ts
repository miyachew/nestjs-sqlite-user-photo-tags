import { IsString } from "class-validator";

export class AddPictureTagDto {
    @IsString()
    tag: string;
}
