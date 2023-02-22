import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CancelShipmentByTrackingNumberQuery } from './cancel-shipment-by-tracking-number.query';
import { CancelShipmentUseCase } from 'src/modules/shipments/application/use-cases/cancel-shipment/cancel-shipment.use-case';
import { ShipmentStatus } from '../../enums/status.enum';

@QueryHandler(CancelShipmentByTrackingNumberQuery)
export class CancelShipmentByTrackingNumberQueryHandler
  implements IQueryHandler<CancelShipmentByTrackingNumberQuery>
{
  constructor(private readonly cancelShipmentUseCase: CancelShipmentUseCase) {}
  public execute(
    query: CancelShipmentByTrackingNumberQuery,
  ): Promise<{ message: string; status: ShipmentStatus }> {
    return this.cancelShipmentUseCase.run(query.trackingNumber);
  }
}
