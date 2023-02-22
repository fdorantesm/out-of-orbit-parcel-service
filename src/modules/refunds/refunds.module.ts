import { Module } from '@nestjs/common';

import { EventHandlers } from './domain/events';

@Module({
  providers: [...EventHandlers],
})
export class RefundsModule {}
