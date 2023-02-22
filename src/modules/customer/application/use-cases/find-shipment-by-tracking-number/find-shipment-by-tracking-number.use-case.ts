import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { UseCase } from 'libs/domain/src';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { FindShipmentByTrackingNumberQuery } from 'src/modules/shipments/domain/queries';

@Injectable()
export class FindShipmentByTrackingNumberUseCase implements UseCase {
  constructor(private readonly queryBus: QueryBus) {}
  public run(trackingNumber: string): Promise<ShipmentEntity> {
    return this.queryBus.execute(
      new FindShipmentByTrackingNumberQuery(trackingNumber),
    );
  }
}
