import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './../config/config.service';
import { PictureService } from './picture.service';

describe('PictureService', () => {
  let service: PictureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PictureService,
        {
          provide: ConfigService,
          useValue: new ConfigService({ folder: './src/config/test.lib' })
        }
      ],
    }).compile();

    service = module.get<PictureService>(PictureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
