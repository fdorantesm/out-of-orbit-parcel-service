import { IQuery } from '@nestjs/cqrs';

export class CancelShipmentByTrackingNumberQuery implements IQuery {
  constructor(public trackingNumber: string) {}
}
