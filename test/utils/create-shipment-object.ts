import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { createShipmentFixture } from 'test/fixtures/shipments/create-shipment.fixture';

export function createShipmentObject() {
  const weight = createShipmentFixture.packet.weight;
  return {
    uuid: 'c05e0697-f56c-477c-a5e3-3c3ae12d10d8',
    userId: 'dbd61c86-acd8-4632-a6b9-1cb406c1ead9',
    status: ShipmentEntity.getInitialStatus(),
    trackingNumber: '08ec4cf56a4e ',
    origin: createShipmentFixture.origin,
    destination: createShipmentFixture.destination,
    packet: {
      ...createShipmentFixture.packet,
      size: ShipmentEntity.calcSize(weight),
    },
  };
}
