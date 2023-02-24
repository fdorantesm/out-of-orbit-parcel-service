import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UseCase } from 'libs/domain/src';
import { CreateShipmentUseCasePayload } from 'src/modules/shipments/application/interfaces/create-shipment/use-case-payload.interface';
import { CreateShipmentCommand } from 'src/modules/shipments/domain/commands';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';

@Injectable()
export class CreateShipmentBulkUseCase implements UseCase {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(
    payload: Omit<CreateShipmentUseCasePayload, 'userId'>[],
    userId: string,
  ): Promise<ShipmentEntity[]> {
    const shipments = await Promise.all(
      payload.map((shipment) =>
        this.commandBus.execute(
          new CreateShipmentCommand({ ...shipment, userId }),
        ),
      ),
    );

    return shipments;
  }
}
