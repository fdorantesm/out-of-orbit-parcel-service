import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { RefundCreatedEvent } from './refund-created.event';

@EventsHandler(RefundCreatedEvent)
export class RefundCreatedEventHandler
  implements IEventHandler<RefundCreatedEvent>
{
  public handle(event: RefundCreatedEvent): void {
    Logger.log(
      `Refund for tracking number ${event.trackingNumber} for $${event.amount} created`,
      RefundCreatedEventHandler.name,
    );
  }
}
