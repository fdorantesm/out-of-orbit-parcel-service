import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateShipmentCommand } from './create-shipment.command';
import { ShipmentEntity } from '../../entities/shipment.entity';
import { CreateShipmentUseCase } from '../../../application/use-cases/create-shipment/create-shipment.use-case';

@CommandHandler(CreateShipmentCommand)
export class CreateShipmentCommandHandler
  implements ICommandHandler<CreateShipmentCommand>
{
  constructor(private readonly createShipmentUseCase: CreateShipmentUseCase) {}

  public execute(command: CreateShipmentCommand): Promise<ShipmentEntity> {
    return this.createShipmentUseCase.run(command.payload);
  }
}
