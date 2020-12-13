import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePictureDto } from './create-picture.dto';

export class UpdatePictureDto extends PartialType(PickType(CreatePictureDto, ['title', 'description'] as const)) { }
