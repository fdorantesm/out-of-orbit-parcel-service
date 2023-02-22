import { Test, TestingModule } from '@nestjs/testing';

import { ListShipmentsUseCase } from './list-shipments.use-case';
import { IdGeneratorModule } from '@app/id-generator';
import { ShortIdGeneratorModule } from '@app/short-id-generator';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';
import { ShipmentsMemoryRepository } from 'src/modules/shipments/infrastructure/database/repositories/shipments.memory.repository';

describe('ListShipmentsUseCase', () => {
  let service: ListShipmentsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IdGeneratorModule, ShortIdGeneratorModule],
      providers: [
        ListShipmentsUseCase,
        ShipmentsService,
        {
          provide: 'ShipmentsRepository',
          useClass: ShipmentsMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<ListShipmentsUseCase>(ListShipmentsUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should returns a list of shipments', async () => {
    const shipments = await service.run();
    shipments.map((shipment) => {
      expect(shipment).toHaveProperty('uuid');
      expect(shipment).toHaveProperty('trackingNumber');
      expect(shipment).toHaveProperty('status');
      expect(shipment).toHaveProperty('origin');
      expect(shipment).toHaveProperty('destination');
      expect(shipment).toHaveProperty('packet');
    });
  });
});
