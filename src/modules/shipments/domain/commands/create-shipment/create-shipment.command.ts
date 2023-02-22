import { ICommand } from '@nestjs/cqrs';

import { CreateShipmentUseCasePayload } from 'src/modules/shipments/application/interfaces/create-shipment/use-case-payload.interface';

export class CreateShipmentCommand implements ICommand {
  constructor(public payload: CreateShipmentUseCasePayload) {}
}
