import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UseCase } from 'libs/domain/src';
import { CreateShipmentCommand } from 'src/modules/shipments/domain/commands';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { CreateShipmentDto } from 'src/modules/shipments/infrastructure/http/dtos/create-shipment.dto';

@Injectable()
export class CreateShipmentUseCase implements UseCase {
  constructor(private readonly commandBus: CommandBus) {}

  public run(payload: CreateShipmentDto): Promise<ShipmentEntity> {
    return this.commandBus.execute(new CreateShipmentCommand(payload));
  }
}
