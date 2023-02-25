import { ICommand } from '@nestjs/cqrs';

import { CreateShipmentUseCasePayload } from 'src/modules/shipments/application/interfaces/create-shipment/use-case-payload.interface';

export class CreateShipmentBulkCommand implements ICommand {
  constructor(public payload: CreateShipmentUseCasePayload[]) {}
}
