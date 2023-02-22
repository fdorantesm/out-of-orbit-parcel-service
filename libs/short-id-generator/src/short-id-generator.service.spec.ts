import { Test, TestingModule } from '@nestjs/testing';
import { ShortIdGeneratorService } from './short-id-generator.service';

describe('ShortIdGeneratorService', () => {
  let service: ShortIdGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortIdGeneratorService],
    }).compile();

    service = module.get<ShortIdGeneratorService>(ShortIdGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a short id', () => {
    const shortId = service.exec();
    expect(shortId).toBeDefined();
    expect(shortId.length).toBe(12);
  });
});
