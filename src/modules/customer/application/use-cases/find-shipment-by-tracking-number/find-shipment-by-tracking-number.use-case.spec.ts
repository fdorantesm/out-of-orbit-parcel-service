import { Test, TestingModule } from '@nestjs/testing';
import { FindShipmentByTrackingNumberUseCase } from './find-shipment-by-tracking-number.use-case';
import { CqrsModule } from '@nestjs/cqrs';

describe('FindShipmentByTrackingNumberService', () => {
  let service: FindShipmentByTrackingNumberUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [FindShipmentByTrackingNumberUseCase],
    }).compile();

    service = module.get<FindShipmentByTrackingNumberUseCase>(
      FindShipmentByTrackingNumberUseCase,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
