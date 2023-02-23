import { Test, TestingModule } from '@nestjs/testing';

import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DateService],
    }).compile();

    service = module.get<DateService>(DateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Create Date time object', () => {
    const now = service.create();
    const now2 = new Date();
    expect(now.toDateString()).toBe(now2.toDateString());
  });

  it('Create Date time christmas object', () => {
    const christmas = '2022-12-25T00:00:00';
    const christmasDate = new Date(christmas);
    const christmasDateTime = service.create(new Date(christmas));
    expect(christmasDate.toDateString()).toBe(christmasDateTime.toDateString());
  });

  it('Add 1 day to date object', () => {
    const day = 1;
    const now = service.create();
    const future = service.in(day, 'day');
    expect(future.getDate() - now.getDate()).toBe(day);
  });
});
