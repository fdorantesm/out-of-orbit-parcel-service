import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindShipmentByTrackingNumberQuery } from './find-shipment-by-tracking-number.query';
import { ShipmentEntity } from '../../entities/shipment.entity';
import { FindShipmentByTrackingNumberUseCase } from 'src/modules/shipments/application/use-cases/find-shipment-by-tracking-number/find-shipment-by-tracking-number.use-case';

@QueryHandler(FindShipmentByTrackingNumberQuery)
export class FindShipmentByTrackingNumberQueryHandler
  implements IQueryHandler<FindShipmentByTrackingNumberQuery>
{
  constructor(
    private readonly findShipmentByTrackingNumberUseCase: FindShipmentByTrackingNumberUseCase,
  ) {}
  public execute(
    query: FindShipmentByTrackingNumberQuery,
  ): Promise<ShipmentEntity> {
    return this.findShipmentByTrackingNumberUseCase.run(query.trackingNumber);
  }
}
