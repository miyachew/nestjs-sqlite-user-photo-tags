import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './../config/config.service';
import { PictureLikeService } from './picture-likes/picture-like.service';
import { PictureTagService } from './picture-tags/picture-tag.service';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';

describe('PictureController', () => {
  let controller: PictureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PictureController],
      providers: [
        PictureService,
        PictureTagService,
        PictureLikeService,
        {
          provide: ConfigService,
          useValue: new ConfigService({ folder: './src/config/test.lib' })
        }],
    }).compile();

    controller = module.get<PictureController>(PictureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
