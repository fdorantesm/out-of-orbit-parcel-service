import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ShipmentModel } from '../models/shipment.model';
import { InjectModel } from '@nestjs/mongoose';
import { CrudRepository } from 'src/core/utils/crud-repository.interface';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { Shipment } from 'src/modules/shipments/domain/interfaces/shipment.interface';

@Injectable()
export class ShipmentsRepository
  implements CrudRepository<ShipmentEntity, Shipment>
{
  constructor(
    @InjectModel(ShipmentModel.name)
    private readonly shipmentModel: Model<ShipmentModel>,
  ) {}

  public async create(data: Shipment): Promise<ShipmentEntity> {
    const shipment = await this.shipmentModel.create(data);
    if (shipment) {
      return ShipmentEntity.create(shipment.toJSON());
    }
  }

  public async find(filter: Partial<Shipment>): Promise<ShipmentEntity[]> {
    const shipments = await this.shipmentModel.find(filter).exec();
    return shipments.map((shipment) =>
      ShipmentEntity.create(shipment.toJSON()),
    );
  }

  public async findOne(filter: Partial<Shipment>): Promise<ShipmentEntity> {
    const shipment = await this.shipmentModel.findOne(filter).exec();
    if (shipment) {
      return ShipmentEntity.create(shipment.toJSON());
    }
  }

  public async update(
    filter: Partial<ShipmentEntity>,
    data: Partial<ShipmentEntity>,
  ): Promise<ShipmentEntity> {
    const q = await this.shipmentModel.updateOne(filter, data).exec();
    if (q.modifiedCount) {
      return this.findOne(filter);
    }
  }

  public async delete(filter: Partial<ShipmentEntity>): Promise<boolean> {
    const query = await this.shipmentModel.deleteOne(filter).exec();
    return !!query.deletedCount;
  }
}
