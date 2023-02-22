import { Test, TestingModule } from '@nestjs/testing';

import { FindShipmentByTrackingNumberUseCase } from './find-shipment-by-tracking-number.use-case';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';
import { ShipmentsMemoryRepository } from 'src/modules/shipments/infrastructure/database/repositories/shipments.memory.repository';
import { IdGeneratorModule } from '@app/id-generator';
import { ShortIdGeneratorModule } from '@app/short-id-generator';

describe('FindShipmentByTrackingNumberUseCase', () => {
  let service: FindShipmentByTrackingNumberUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IdGeneratorModule, ShortIdGeneratorModule],
      providers: [
        {
          provide: 'ShipmentsRepository',
          useClass: ShipmentsMemoryRepository,
        },
        FindShipmentByTrackingNumberUseCase,
        ShipmentsService,
      ],
    }).compile();

    service = module.get<FindShipmentByTrackingNumberUseCase>(
      FindShipmentByTrackingNumberUseCase,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should returns a shipment by tracking number', async () => {
    const trackingNumber = '4Ah10NtKxFmd';
    const shipment = await service.run(trackingNumber);
    expect(shipment.trackingNumber).toBe(trackingNumber);
    expect(shipment).toHaveProperty('uuid');
    expect(shipment).toHaveProperty('status');
    expect(shipment).toHaveProperty('origin');
    expect(shipment).toHaveProperty('destination');
    expect(shipment).toHaveProperty('packet');
  });
});
