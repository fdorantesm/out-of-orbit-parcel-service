import { IQuery } from '@nestjs/cqrs';

export class FindShipmentByTrackingNumberQuery implements IQuery {
  constructor(public trackingNumber: string) {}
}
