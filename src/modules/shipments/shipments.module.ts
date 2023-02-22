import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShipmentController } from './infrastructure/http/controllers/shipment.controller';
import { ShipmentModelConfig } from './infrastructure/database';
import { ShipmentsRepository } from './infrastructure/database/repositories/shipments.repository';
import { ShipmentsService } from './infrastructure/database/services/shipments.service';
import { CreateShipmentUseCase } from './application/use-cases/create-shipment/create-shipment.use-case';
import { ListShipmentsUseCase } from './application/use-cases/list-shipments/list-shipments.use-case';
import { FindShipmentByTrackingNumberUseCase } from './application/use-cases/find-shipment-by-tracking-number/find-shipment-by-tracking-number.use-case';
import { UpdateShipmentStatusUseCase } from './application/use-cases/update-shipment-status/update-shipment-status.use-case';
import { CancelShipmentUseCase } from './application/use-cases/cancel-shipment/cancel-shipment.use-case';
import { IdGeneratorModule } from '@app/id-generator';
import { ShortIdGeneratorModule } from '@app/short-id-generator';

@Module({
  imports: [
    MongooseModule.forFeature([ShipmentModelConfig]),
    IdGeneratorModule,
    ShortIdGeneratorModule,
  ],
  providers: [
    {
      provide: 'ShipmentsRepository',
      useClass: ShipmentsRepository,
    },
    ShipmentsService,
    CancelShipmentUseCase,
    CreateShipmentUseCase,
    ListShipmentsUseCase,
    UpdateShipmentStatusUseCase,
    FindShipmentByTrackingNumberUseCase,
  ],
  controllers: [ShipmentController],
})
export class ShipmentsModule {}
