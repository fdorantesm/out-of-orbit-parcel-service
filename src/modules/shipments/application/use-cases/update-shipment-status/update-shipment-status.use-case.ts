import { Injectable, NotFoundException } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { CantUpdateCancelledShipmentStatusException } from 'src/modules/shipments/domain/exceptions/cant-update-cancelled-shipment-status.exception';
import { UpdatableShipmentStatus } from 'src/modules/shipments/domain/types/updatable-status.type';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';

@Injectable()
export class UpdateShipmentStatusUseCase implements UseCase {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  public async run(
    trackingNumber: string,
    status: UpdatableShipmentStatus,
  ): Promise<ShipmentEntity> {
    const shipment = await this.shipmentsService.findOne({ trackingNumber });

    if (!shipment) {
      throw new NotFoundException();
    }

    if (shipment.isCancelled()) {
      throw new CantUpdateCancelledShipmentStatusException();
    }

    return await this.shipmentsService.update({ trackingNumber }, { status });
  }
}
