import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindShipmentsByUserId } from './find-shipments-by-user-id.query';
import { ShipmentEntity } from '../../entities/shipment.entity';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';

@QueryHandler(FindShipmentsByUserId)
export class FindShipmentsByUserIdHandler
  implements IQueryHandler<FindShipmentsByUserId>
{
  // TODO: Create use case
  constructor(private readonly shipmentsService: ShipmentsService) {}
  public async execute(
    query: FindShipmentsByUserId,
  ): Promise<ShipmentEntity[]> {
    return await this.shipmentsService.find({ userId: query.userId });
  }
}
