import { Injectable, NotFoundException } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { UseCase } from 'libs/domain/src';
import { RefundCreatedEvent } from 'src/modules/refunds/domain/events';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { ShipmentStatus } from 'src/modules/shipments/domain/enums/status.enum';
import { CouldCancelDeliveredShipmentException } from 'src/modules/shipments/domain/exceptions/couldnt-cancel-delivered-shipment.exception';
import { CouldCancelInDeliveryShipmentException } from 'src/modules/shipments/domain/exceptions/couldnt-cancel-in-delivery-shipment.exception';
import { ShipmentAlreadyCancelledException } from 'src/modules/shipments/domain/exceptions/shipment-already-cancelled.exception';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';

@Injectable()
export class CancelShipmentUseCase implements UseCase {
  constructor(
    private readonly shipmentsService: ShipmentsService,
    private readonly eventBus: EventBus,
  ) {}

  public async run(trackingNumber: string): Promise<ShipmentEntity> {
    const shipment = await this.shipmentsService.findOne({ trackingNumber });

    if (!shipment) {
      throw new NotFoundException();
    }

    if (shipment.isCancelableWithRefund()) {
      this.eventBus.publish(
        new RefundCreatedEvent(shipment.trackingNumber, shipment.userId, 100),
      );
    }

    if (shipment.hasStatus(ShipmentStatus.DELIVERED)) {
      throw new CouldCancelDeliveredShipmentException();
    }

    if (shipment.hasStatus(ShipmentStatus.ON_DELIVERY)) {
      throw new CouldCancelInDeliveryShipmentException();
    }

    if (shipment.hasStatus(ShipmentStatus.CANCELLED)) {
      throw new ShipmentAlreadyCancelledException();
    }

    if (shipment.isCancelable()) {
      shipment.cancel();
    }

    return this.shipmentsService.update(
      { trackingNumber },
      { status: ShipmentStatus.CANCELLED },
    );
  }
}
