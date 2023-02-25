import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateShipmentBulkCommand } from './create-bulk-shipment.command';
import { CreateShipmentsBulkUseCase } from 'src/modules/shipments/application/use-cases/create-shipments-bulk/create-shipment.use-case';
import { BulkException } from '@app/common/types/general/bulk-exception.type';
import { Shipment } from '../../interfaces/shipment.interface';
import { Bulk } from '@app/common/types/general/bulk.type';
import { ShipmentEntity } from '../../entities/shipment.entity';

@CommandHandler(CreateShipmentBulkCommand)
export class CreateShipmentBulkCommandHandler
  implements ICommandHandler<CreateShipmentBulkCommand>
{
  constructor(
    private readonly createShipmentsBulkUseCase: CreateShipmentsBulkUseCase,
  ) {}

  public execute(
    command: CreateShipmentBulkCommand,
  ): Promise<Bulk<ShipmentEntity, BulkException<Partial<Shipment>>>> {
    return this.createShipmentsBulkUseCase.run(command.payload);
  }
}
