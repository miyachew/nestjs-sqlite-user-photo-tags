import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { PictureTagService } from './picture-tags/picture-tag.service';

@Module({
  imports: [],
  controllers: [PictureController],
  providers: [
    PictureService,
    PictureTagService
  ]
})
export class PictureModule { }
