import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService({ folder: './src/config/test.lib' })
        }
      ],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test undefined value, should be undefined', () => {
    expect(service.get('UNDEFINED_VALUE')).toBeUndefined();
  });

  it('test JWT_EXPIRES_IN, should be 1d', () => {
    expect(service.get('JWT_EXPIRES_IN')).toEqual('1d');
  });
});
