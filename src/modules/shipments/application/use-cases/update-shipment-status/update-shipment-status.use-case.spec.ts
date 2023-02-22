import { Test, TestingModule } from '@nestjs/testing';

import { UpdateShipmentStatusUseCase } from './update-shipment-status.use-case';
import { IdGeneratorModule } from '@app/id-generator';
import { ShortIdGeneratorModule } from '@app/short-id-generator';
import { ShipmentsMemoryRepository } from 'src/modules/shipments/infrastructure/database/repositories/shipments.memory.repository';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';
import { ShipmentStatus } from 'src/modules/shipments/domain/enums/status.enum';

describe('UpdateShipmentStatusUseCase', () => {
  let service: UpdateShipmentStatusUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IdGeneratorModule, ShortIdGeneratorModule],
      providers: [
        UpdateShipmentStatusUseCase,
        ShipmentsService,
        {
          provide: 'ShipmentsRepository',
          useClass: ShipmentsMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateShipmentStatusUseCase>(
      UpdateShipmentStatusUseCase,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should returns a shipment by tracking number', async () => {
    const trackingNumber = 'VfAWh4rv0IY3';
    const shipment = await service.run(
      trackingNumber,
      ShipmentStatus.CANCELLED,
    );
    expect(shipment.trackingNumber).toBe(trackingNumber);
    expect(shipment.hasStatus(ShipmentStatus.CANCELLED)).toBeTruthy();
  });
});
