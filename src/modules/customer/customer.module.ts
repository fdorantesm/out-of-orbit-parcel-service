import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ShipmentsController } from './infrastructure/http/controllers/shipments.controller';
import { CreateShipmentUseCase } from './application/use-cases/create-shipment/create-shipment.use-case';
import { FindShipmentsByUserIdUseCase } from './application/use-cases/find-shipments-by-user-id/find-shipments-by-user-id.use-case';
import { CancelShipmentByTrackingNumberUseCase } from './application/use-cases/cancel-shipment-by-tracking-number/cancel-shipment-by-tracking-number.use-case';
import { FindShipmentByTrackingNumberUseCase } from './application/use-cases/find-shipment-by-tracking-number/find-shipment-by-tracking-number.use-case';
import { CreateShipmentBulkUseCase } from './application/use-cases/create-shipments-bulk/create-shipments-bulk.use-case';

@Module({
  imports: [CqrsModule],
  controllers: [ShipmentsController],
  providers: [
    CreateShipmentUseCase,
    FindShipmentsByUserIdUseCase,
    CancelShipmentByTrackingNumberUseCase,
    FindShipmentByTrackingNumberUseCase,
    CreateShipmentBulkUseCase,
  ],
})
export class CustomerModule {}
