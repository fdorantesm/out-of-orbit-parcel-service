import { ICommand } from '@nestjs/cqrs';

import { CreateShipmentPayload } from '../../interfaces/shipment.interface';

export class CreateShipmentCommand implements ICommand {
  constructor(public payload: CreateShipmentPayload) {}
}
