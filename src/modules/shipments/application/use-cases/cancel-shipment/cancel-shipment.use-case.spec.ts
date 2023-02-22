import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';

import { CancelShipmentUseCase } from './cancel-shipment.use-case';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';
import { ShipmentsMemoryRepository } from 'src/modules/shipments/infrastructure/database/repositories/shipments.memory.repository';
import { IdGeneratorModule } from '@app/id-generator';
import { ShortIdGeneratorModule } from '@app/short-id-generator';
import { ShipmentStatus } from 'src/modules/shipments/domain/enums/status.enum';
import { CouldCancelDeliveredShipmentException } from 'src/modules/shipments/domain/exceptions/couldnt-cancel-delivered-shipment.exception';
import { CouldCancelInDeliveryShipmentException } from 'src/modules/shipments/domain/exceptions/couldnt-cancel-in-delivery-shipment.exception';
import { ShipmentAlreadyCancelledException } from 'src/modules/shipments/domain/exceptions/shipment-already-cancelled.exception';
import { CreateShipmentUseCase } from '../create-shipment/create-shipment.use-case';
import { createShipmentFixture } from 'test/fixtures/shipments/create-shipment.fixture';

describe('CancelShipmentUseCase', () => {
  let service: CancelShipmentUseCase;
  let createShipmentUseCase: CreateShipmentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, IdGeneratorModule, ShortIdGeneratorModule],
      providers: [
        {
          provide: 'ShipmentsRepository',
          useClass: ShipmentsMemoryRepository,
        },
        CancelShipmentUseCase,
        CreateShipmentUseCase,
        ShipmentsService,
      ],
    }).compile();

    service = module.get<CancelShipmentUseCase>(CancelShipmentUseCase);
    createShipmentUseCase = module.get<CreateShipmentUseCase>(
      CreateShipmentUseCase,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have defined a run method', () => {
    expect(service.run).toBeDefined();
  });

  it('should cancel a shipment without refund', async () => {
    const trackingNumber = 'VfAWh4rv0IY3';
    const cancelled = await service.run(trackingNumber);
    expect(cancelled.message).toBe('Shipment was cancelled without a refund');
    expect(cancelled.status).toBe(ShipmentStatus.CANCELLED);
  });

  it('should cancel a shipment with refund', async () => {
    const shipment = await createShipmentUseCase.run(createShipmentFixture);
    const cancelled = await service.run(shipment.trackingNumber);
    expect(cancelled.message).toBe('Shipment was cancelled with a refund');
    expect(cancelled.status).toBe(ShipmentStatus.CANCELLED);
  });

  it('should fails canceling a delivered shipment', async () => {
    const trackingNumber = '4Ah10NtKxFmd';
    try {
      await service.run(trackingNumber);
    } catch (error) {
      expect(error instanceof CouldCancelDeliveredShipmentException);
    }
  });

  it('should fails canceling a shipment in in_delivery status', async () => {
    const trackingNumber = 'h9xHXIYgLxP2';
    try {
      await service.run(trackingNumber);
    } catch (error) {
      expect(error instanceof CouldCancelInDeliveryShipmentException);
    }
  });

  it('should fails canceling a delivered shipment', async () => {
    const trackingNumber = '4LQGuZOdkWDX';
    try {
      await service.run(trackingNumber);
    } catch (error) {
      expect(error instanceof ShipmentAlreadyCancelledException);
    }
  });
});
