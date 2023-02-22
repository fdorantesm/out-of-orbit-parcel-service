import { Test, TestingModule } from '@nestjs/testing';

import { CreateShipmentsBulkUseCase } from './create-shipment.use-case';
import { ShipmentStatus } from 'src/modules/shipments/domain/enums/status.enum';
import { ShipmentsMemoryRepository } from 'src/modules/shipments/infrastructure/database/repositories/shipments.memory.repository';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';
import { IdGeneratorModule } from '@app/id-generator';
import { ShortIdGeneratorModule } from '@app/short-id-generator';
import { createShipmentObject } from 'test/utils/create-shipment-object';
import { SharedModule } from 'src/modules/shared/shared.module';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';

describe('CreateShipmentsBulkUseCase', () => {
  let service: CreateShipmentsBulkUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IdGeneratorModule, ShortIdGeneratorModule, SharedModule],
      providers: [
        ShipmentsService,
        CreateShipmentsBulkUseCase,
        {
          provide: 'ShipmentsRepository',
          useClass: ShipmentsMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<CreateShipmentsBulkUseCase>(
      CreateShipmentsBulkUseCase,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a set of shipments', async () => {
    const payload = Array.from(Array(10).keys()).map((key) =>
      createShipmentObject(),
    );
    const shipments: ShipmentEntity[] = [];
    shipments.forEach((shipment) => {
      expect(shipment.hasStatus(ShipmentStatus.CREATED)).toBeTruthy();
      expect(shipment.isCancelableWithRefund()).toBeTruthy();
    });
  });
});
