import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BulkException } from '@app/common/types/general/bulk-exception.type';
import { Bulk } from '@app/common/types/general/bulk.type';
import { UseCase } from 'libs/domain/src';
import { CreateShipmentUseCasePayload } from 'src/modules/shipments/application/interfaces/create-shipment/use-case-payload.interface';
import { CreateShipmentBulkCommand } from 'src/modules/shipments/domain/commands/create-shipment-bulk/create-bulk-shipment.command';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { Shipment } from 'src/modules/shipments/domain/interfaces/shipment.interface';

@Injectable()
export class CreateShipmentBulkUseCase implements UseCase {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(
    payload: Omit<CreateShipmentUseCasePayload, 'userId'>[],
    userId: string,
  ): Promise<Bulk<ShipmentEntity, BulkException<Partial<Shipment>>>> {
    const shipments = await this.commandBus.execute(
      new CreateShipmentBulkCommand(
        payload.map((shipment) => ({ ...shipment, userId })),
      ),
    );

    return shipments;
  }
}
