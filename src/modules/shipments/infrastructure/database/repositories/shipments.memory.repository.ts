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

  public async create(data: Shipment): Promise<ShipmentEntity> {
    this.shipmentList.push(ShipmentEntity.create(data));
    return await ShipmentEntity.create(data);
  }

  // eslint-disable-next-line
  public async find(filter: Partial<Shipment>): Promise<ShipmentEntity[]> {
    return await this.shipmentList.map((shipment) =>
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

  public async findOne(filter: Partial<Shipment>): Promise<ShipmentEntity> {
    const shipmentExists = this.shipmentList.find(
      (shipment) => filter.trackingNumber === shipment.trackingNumber,
    );

    if (shipmentExists) {
      return ShipmentEntity.create(shipmentExists);
    }
  }

  public async update(
    filter: Partial<Shipment>,
    data: Partial<ShipmentEntity>,
  ): Promise<ShipmentEntity> {
    const shipment = await this.findOne(filter);
    return ShipmentEntity.create({ ...shipment, ...data });
  }
  // eslint-disable-next-line
  public async delete(filter?: Partial<Shipment>): Promise<void> {}
}
