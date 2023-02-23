import { Inject, Injectable } from '@nestjs/common';

import { ShipmentsRepository } from '../repositories/shipments.repository';
import { CrudRepository } from 'src/core/utils/crud-repository.interface';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { Shipment } from 'src/modules/shipments/domain/interfaces/shipment.interface';
import { ID_GENERATOR_SERVICE, IdGeneratorService } from '@app/id-generator';
import { ShortIdGeneratorService } from '@app/short-id-generator';

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

  public create(data: Shipment): ShipmentEntity | Promise<ShipmentEntity> {
    return this.shipmentsRepository.create(data);
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
