import { Test } from '@nestjs/testing';
import { ShipmentsMemoryRepository } from '../repositories/shipments.memory.repository';
import { ShipmentsService } from './shipments.service';
import { shipmentList } from 'test/fixtures/shipments/shipment-list.fixture';
import { createShipmentFixture } from 'test/fixtures/shipments/create-shipment.fixture';
import { ShipmentStatus } from 'src/modules/shipments/domain/enums/status.enum';
import { IdGeneratorModule } from '@app/id-generator';
import { ShortIdGeneratorModule } from '@app/short-id-generator';

describe('ShipmentsService', () => {
  let service: ShipmentsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [IdGeneratorModule, ShortIdGeneratorModule],
      providers: [
        ShipmentsService,
        {
          provide: 'ShipmentsRepository',
          useClass: ShipmentsMemoryRepository,
        },
      ],
    }).compile();

    service = module.get(ShipmentsService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should returns a list of shipments', async () => {
    const list = await service.find({});
    const listItem = list[0];
    const item = shipmentList[0];
    expect(list.length).toBe(shipmentList.length);
    expect(listItem.trackingNumber).toEqual(item.trackingNumber);
    expect(listItem).toHaveProperty('uuid');
    expect(listItem).toHaveProperty('trackingNumber');
    expect(listItem).toHaveProperty('origin');
    expect(listItem).toHaveProperty('destination');
    expect(listItem).toHaveProperty('packet');
    expect(listItem).toHaveProperty('userId');
    expect(listItem).toHaveProperty('status');
    expect(listItem).toHaveProperty('createdAt');
  });

  it('Should returns the shipment with tracking number b64EW2ALtkqc', async () => {
    const trackingNumber = 'b64EW2ALtkqc';
    const shipment = await service.findOne({ trackingNumber });
    expect(shipment.trackingNumber).toBe(trackingNumber);
  });

  it('Should creates a shipment', async () => {
    const shipment = await service.create(createShipmentFixture);
    expect(shipment).toBeDefined();
    expect(shipment.status).toBe(ShipmentStatus.CREATED);
  });
});
