import { Test, TestingModule } from '@nestjs/testing';

import { CreateShipmentUseCase } from './create-shipment.use-case';
import { ShipmentStatus } from 'src/modules/shipments/domain/enums/status.enum';
import { createShipmentFixture } from 'test/fixtures/shipments/create-shipment.fixture';
import { ShipmentsMemoryRepository } from 'src/modules/shipments/infrastructure/database/repositories/shipments.memory.repository';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';
import { IdGeneratorModule } from '@app/id-generator';
import { ShortIdGeneratorModule } from '@app/short-id-generator';

describe('CreateShipmentUseCase', () => {
  let service: CreateShipmentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IdGeneratorModule, ShortIdGeneratorModule],
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
    const shipment = await service.run(createShipmentFixture);
    expect(shipment.hasStatus(ShipmentStatus.CREATED)).toBeTruthy();
    expect(shipment.isCancelableWithRefund()).toBeTruthy();
  });
});
