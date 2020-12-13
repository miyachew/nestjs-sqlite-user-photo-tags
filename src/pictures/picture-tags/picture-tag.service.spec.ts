import { Test, TestingModule } from '@nestjs/testing';
import { PictureTagService } from './picture-tag.service';

describe('PictureTagService', () => {
  let service: PictureTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PictureTagService],
    }).compile();

    service = module.get<PictureTagService>(PictureTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
