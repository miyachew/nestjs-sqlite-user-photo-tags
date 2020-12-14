import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { PictureTagService } from './picture-tags/picture-tag.service';
import { PictureLikeService } from './picture-likes/picture-like.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule.register({ folder: './config' })],
  controllers: [PictureController],
  providers: [
    PictureService,
    PictureTagService,
    PictureLikeService
  ]
})
export class PictureModule { }
