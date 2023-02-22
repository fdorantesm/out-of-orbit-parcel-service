import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';

import { CancelShipmentByTrackingNumberUseCase } from './cancel-shipment-by-tracking-number.use-case';

describe('CancelShipmentByTrackingNumberService', () => {
  let service: CancelShipmentByTrackingNumberUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [CancelShipmentByTrackingNumberUseCase],
    }).compile();

    service = module.get<CancelShipmentByTrackingNumberUseCase>(
      CancelShipmentByTrackingNumberUseCase,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
