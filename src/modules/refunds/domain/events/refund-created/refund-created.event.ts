import { IEvent } from '@nestjs/cqrs';

export class RefundCreatedEvent implements IEvent {
  constructor(
    public trackingNumber: string,
    public userId: string,
    public amount: number,
  ) {}
}
