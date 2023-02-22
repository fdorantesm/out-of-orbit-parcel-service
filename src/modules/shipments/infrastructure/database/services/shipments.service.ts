import { Inject, Injectable } from '@nestjs/common';

import { ShipmentsRepository } from '../repositories/shipments.repository';
import { CrudRepository } from 'src/core/utils/crud-repository.interface';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import {
  CreateShipmentPayload,
  Shipment,
} from 'src/modules/shipments/domain/interfaces/shipment.interface';
import { ShipmentStatus } from 'src/modules/shipments/domain/enums/status.enum';
import { ID_GENERATOR_SERVICE, IdGeneratorService } from '@app/id-generator';
import { ShortIdGeneratorService } from '@app/short-id-generator';
import { PackageSize } from 'src/modules/shipments/domain/enums/size.enum';

@Injectable()
export class ShipmentsService
  implements CrudRepository<ShipmentEntity, Shipment>
{
  constructor(
    @Inject('ShipmentsRepository')
    private readonly shipmentsRepository: ShipmentsRepository,
    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorModule: IdGeneratorService,
    private readonly shortIdGeneratorService: ShortIdGeneratorService,
  ) {}

  public create(
    data: CreateShipmentPayload,
  ): ShipmentEntity | Promise<ShipmentEntity> {
    // TODO: Receive uuid, userId, trackingNumber and size from a top level
    const uuid = this.idGeneratorModule.exec();
    const userId = this.idGeneratorModule.exec();
    const trackingNumber = this.shortIdGeneratorService.exec(12);
    const weight = data.packet.weight;
    const size =
      weight <= 5000
        ? PackageSize.SMALL
        : weight <= 15000
        ? PackageSize.MEDIUM
        : PackageSize.LARGE;

    const shipment: Shipment = {
      uuid,
      userId,
      trackingNumber,
      origin: data.origin,
      destination: data.destination,
      packet: {
        ...data.packet,
        size,
      },
      status: ShipmentStatus.CREATED,
      createdAt: new Date(),
    };

    return this.shipmentsRepository.create(shipment);
  }

  public find(
    filter: Partial<Shipment>,
  ): ShipmentEntity[] | Promise<ShipmentEntity[]> {
    return this.shipmentsRepository.find(filter);
  }

  public findOne(
    filter: Partial<Shipment>,
  ): ShipmentEntity | Promise<ShipmentEntity> {
    return this.shipmentsRepository.findOne(filter);
  }

  public update(
    filter: Partial<Shipment>,
    data: Partial<ShipmentEntity>,
  ): ShipmentEntity | Promise<ShipmentEntity> {
    return this.shipmentsRepository.update(filter, data);
  }

  public delete(filter: Partial<Shipment>): Promise<boolean> {
    return this.shipmentsRepository.delete(filter);
  }
}
