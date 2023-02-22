import { Module } from '@nestjs/common';

import { CoreModule } from '../../core/core.module';
import { AuthModule } from '../auth/auth.module';
import { HealthModule } from '../health/health.module';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from 'src/database/database.module';
import { ApiKeysModule } from '../api-keys/api-keys.module';
import { ShipmentsModule } from '../shipments/shipments.module';
import { RefundsModule } from '../refunds/refunds.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    SharedModule,
    HealthModule,
    AuthModule,
    UsersModule,
    ApiKeysModule,
    ShipmentsModule,
    RefundsModule,
    CustomerModule,
  ],
})
export class AppModule {}
