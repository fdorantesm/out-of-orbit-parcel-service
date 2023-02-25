import { Injectable } from '@nestjs/common';

import { CrudRepository } from 'src/core/utils/crud-repository.interface';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { Shipment } from 'src/modules/shipments/domain/interfaces/shipment.interface';
import { shipmentList } from 'test/fixtures/shipments/shipment-list.fixture';

@Injectable()
export class ShipmentsMemoryRepository
  implements CrudRepository<ShipmentEntity, Shipment>
{
  private shipmentList: Shipment[] = shipmentList;

  public create(data: Shipment): ShipmentEntity {
    this.shipmentList.push(ShipmentEntity.create(data));
    return ShipmentEntity.create(data);
  }

  public createBulk(shipments: Shipment[]): ShipmentEntity[] {
    const shipEntities = shipments.map((shipment) =>
      ShipmentEntity.create(shipment),
    );
    this.shipmentList.concat(shipEntities);
    return shipEntities;
  }

  // eslint-disable-next-line
  public find(filter: Partial<Shipment>): ShipmentEntity[] {
    return this.shipmentList.map((shipment) =>
      ShipmentEntity.create({
        uuid: shipment.uuid,
        trackingNumber: shipment.trackingNumber,
        origin: {
          street: shipment.origin.street,
          extNumber: shipment.origin.extNumber,
          intNumber: shipment.origin.intNumber,
          neighborhood: shipment.origin.neighborhood,
          city: shipment.origin.city,
          state: shipment.origin.state,
          zipCode: shipment.origin.zipCode,
          location: {
            latitude: shipment.origin.location.latitude,
            longitude: shipment.origin.location.longitude,
          },
        },
        destination: {
          street: shipment.destination.street,
          extNumber: shipment.destination.extNumber,
          intNumber: shipment.destination.intNumber,
          neighborhood: shipment.destination.neighborhood,
          city: shipment.destination.city,
          state: shipment.destination.state,
          zipCode: shipment.destination.zipCode,
          location: {
            latitude: shipment.destination.location.latitude,
            longitude: shipment.destination.location.longitude,
          },
        },
        packet: {
          height: shipment.packet.height,
          length: shipment.packet.length,
          size: shipment.packet.size,
          weight: shipment.packet.weight,
          width: shipment.packet.width,
        },
        status: shipment.status,
        userId: shipment.userId,
        createdAt: shipment.createdAt,
      }),
    );
  }

  public findOne(filter: Partial<Shipment>): ShipmentEntity {
    const shipmentExists = this.shipmentList.find(
      (shipment) => filter.trackingNumber === shipment.trackingNumber,
    );

    if (shipmentExists) {
      return ShipmentEntity.create(shipmentExists);
    }
  }

  public update(
    filter: Partial<Shipment>,
    data: Partial<ShipmentEntity>,
  ): ShipmentEntity {
    const shipment = this.findOne(filter);
    return ShipmentEntity.create({ ...shipment, ...data });
  }
  // eslint-disable-next-line
  public delete(filter?: Partial<Shipment>): void {}
}
