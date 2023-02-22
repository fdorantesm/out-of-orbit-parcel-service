import { Injectable } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';

@Injectable()
export class ListShipmentsUseCase implements UseCase {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  public async run(): Promise<ShipmentEntity[]> {
    return this.shipmentsService.find({});
  }
}
