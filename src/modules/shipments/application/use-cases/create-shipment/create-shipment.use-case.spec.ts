import { Test, TestingModule } from '@nestjs/testing';

import { CreateShipmentUseCase } from './create-shipment.use-case';
import { ShipmentStatus } from 'src/modules/shipments/domain/enums/status.enum';
import { ShipmentsMemoryRepository } from 'src/modules/shipments/infrastructure/database/repositories/shipments.memory.repository';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';
import { IdGeneratorModule } from '@app/id-generator';
import { ShortIdGeneratorModule } from '@app/short-id-generator';
import { createShipmentObject } from 'test/utils/create-shipment-object';
import { SharedModule } from 'src/modules/shared/shared.module';

describe('CreateShipmentUseCase', () => {
  let service: CreateShipmentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IdGeneratorModule, ShortIdGeneratorModule, SharedModule],
      providers: [
        ShipmentsService,
        CreateShipmentUseCase,
        {
          provide: 'ShipmentsRepository',
          useClass: ShipmentsMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<CreateShipmentUseCase>(CreateShipmentUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new shipment', async () => {
    const shipment = await service.run(createShipmentObject());
    expect(shipment.hasStatus(ShipmentStatus.CREATED)).toBeTruthy();
    expect(shipment.isCancelableWithRefund()).toBeTruthy();
  });
});
