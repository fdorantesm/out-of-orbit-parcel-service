import { IQuery } from '@nestjs/cqrs';

export class FindShipmentsByUserId implements IQuery {
  constructor(public userId: string) {}
}
