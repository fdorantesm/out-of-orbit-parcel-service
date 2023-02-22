import { Injectable, NotFoundException } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { UseCase } from 'libs/domain/src';
import { RefundCreatedEvent } from 'src/modules/refunds/domain/events';
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

  public async run(
    trackingNumber: string,
  ): Promise<{ message: string; status: ShipmentStatus.CANCELLED }> {
    const shipment = await this.shipmentsService.findOne({ trackingNumber });
    let message = 'Shipment was cancelled without a refund';

    if (!shipment) {
      throw new NotFoundException();
    }

    if (shipment.isCancelableWithRefund()) {
      // TODO: Create message codes
      message = 'Shipment was cancelled with a refund';
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

    await this.shipmentsService.update(
      { trackingNumber: shipment.trackingNumber },
      {
        status: ShipmentStatus.CANCELLED,
      },
    );

    return { status: ShipmentStatus.CANCELLED, message };
  }
}
