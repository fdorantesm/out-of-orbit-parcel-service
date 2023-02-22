import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { UseCase } from 'libs/domain/src';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { FindShipmentsByUserId } from 'src/modules/shipments/domain/queries';

@Injectable()
export class FindShipmentsByUserIdUseCase implements UseCase {
  constructor(private readonly queryBus: QueryBus) {}
  public run(userId: string): Promise<ShipmentEntity[]> {
    return this.queryBus.execute(new FindShipmentsByUserId(userId));
  }
}
