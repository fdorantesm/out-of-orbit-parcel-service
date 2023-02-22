import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateShipmentBulkCommand } from './create-bulk-shipment.command';
import { ShipmentEntity } from '../../entities/shipment.entity';
import { CreateShipmentsBulkUseCase } from 'src/modules/shipments/application/use-cases/create-shipments-bulk/create-shipment.use-case';

@CommandHandler(CreateShipmentBulkCommand)
export class CreateShipmentBulkCommandHandler
  implements ICommandHandler<CreateShipmentBulkCommand>
{
  constructor(
    private readonly createShipmentsBulkUseCase: CreateShipmentsBulkUseCase,
  ) {}

  public execute(command: CreateShipmentBulkCommand): Promise<ShipmentEntity> {
    return this.createShipmentsBulkUseCase.run(command.payload);
  }
}
