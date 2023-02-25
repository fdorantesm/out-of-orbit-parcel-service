import { Test, TestingModule } from '@nestjs/testing';

import { CreateShipmentsBulkUseCase } from './create-shipment.use-case';
import { ShipmentStatus } from 'src/modules/shipments/domain/enums/status.enum';
import { ShipmentsMemoryRepository } from 'src/modules/shipments/infrastructure/database/repositories/shipments.memory.repository';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';
import { IdGeneratorModule } from '@app/id-generator';
import { ShortIdGeneratorModule } from '@app/short-id-generator';
import { createShipmentObject } from 'test/utils/create-shipment-object';
import { SharedModule } from 'src/modules/shared/shared.module';

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

  it('should create a set of valid shipments', async () => {
    const items = 10;
    const payload = Array.from(Array(items).keys()).map(() =>
      createShipmentObject(),
    );
    const shipments = await service.run(payload);

    expect(shipments.errors.length).toBe(0);
    expect(shipments.items.length).toBe(items);

    shipments.items.forEach((shipment) => {
      expect(shipment.hasStatus(ShipmentStatus.CREATED)).toBeTruthy();
      expect(shipment.isCancelableWithRefund()).toBeTruthy();
    });
  });

  it('should create a set of nine valid shipments and one errored', async () => {
    const payload = Array.from(Array(10).keys()).map(() =>
      createShipmentObject(),
    );

    payload[0].packet.weight = 1000000;

    const shipments = await service.run(payload);

    expect(shipments.errors.length).toBe(1);
    expect(shipments.items.length).toBe(9);

    shipments.items.forEach((shipment) => {
      expect(shipment.hasStatus(ShipmentStatus.CREATED)).toBeTruthy();
      expect(shipment.isCancelableWithRefund()).toBeTruthy();
    });
  });
});
