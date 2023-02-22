import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { UseCase } from 'libs/domain/src';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { CancelShipmentByTrackingNumberQuery } from 'src/modules/shipments/domain/queries';

@Injectable()
export class CancelShipmentByTrackingNumberUseCase implements UseCase {
  constructor(private readonly queryBus: QueryBus) {}
  public run(trackingNumber: string): Promise<ShipmentEntity> {
    return this.queryBus.execute(
      new CancelShipmentByTrackingNumberQuery(trackingNumber),
    );
  }
}
