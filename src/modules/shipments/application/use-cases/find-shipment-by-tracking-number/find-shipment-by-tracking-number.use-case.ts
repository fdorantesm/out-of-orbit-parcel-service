import { Injectable, NotFoundException } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';

@Injectable()
export class FindShipmentByTrackingNumberUseCase implements UseCase {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  public async run(trackingNumber: string): Promise<ShipmentEntity> {
    const shipment = await this.shipmentsService.findOne({ trackingNumber });
    if (!shipment) {
      throw new NotFoundException();
    }

    return shipment;
  }
}
