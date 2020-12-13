import { Test, TestingModule } from '@nestjs/testing';
import { PictureLikeService } from './picture-like.service';

describe('PictureLikeService', () => {
  let service: PictureLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PictureLikeService],
    }).compile();

    service = module.get<PictureLikeService>(PictureLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
