import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CancelShipmentUseCase } from 'src/modules/shipments/application/use-cases/cancel-shipment/cancel-shipment.use-case';
import { CreateShipmentUseCase } from 'src/modules/shipments/application/use-cases/create-shipment/create-shipment.use-case';
import { FindShipmentByTrackingNumberUseCase } from 'src/modules/shipments/application/use-cases/find-shipment-by-tracking-number/find-shipment-by-tracking-number.use-case';
import { ListShipmentsUseCase } from 'src/modules/shipments/application/use-cases/list-shipments/list-shipments.use-case';
import { UpdateShipmentStatusUseCase } from 'src/modules/shipments/application/use-cases/update-shipment-status/update-shipment-status.use-case';
import { CreateShipmentDto } from '../dtos/create-shipment.dto';
import { UpdateShipmentStatusDto } from '../dtos/update-shipment-status.dto';

@ApiTags('Shipments')
@Controller({
  version: '1',
  path: 'shipments',
})
export class ShipmentController {
  constructor(
    private readonly cancelShipmentUseCase: CancelShipmentUseCase,
    private readonly createShipmentUseCase: CreateShipmentUseCase,
    private readonly findShipmentByTrackingNumberUseCase: FindShipmentByTrackingNumberUseCase,
    private readonly listShipmentsUseCase: ListShipmentsUseCase,
    private readonly updateShipmentStatusUseCase: UpdateShipmentStatusUseCase,
  ) {}

  @Post('/')
  public async createShipment(@Body() shipment: CreateShipmentDto) {
    return await this.createShipmentUseCase.run(shipment);
  }

  @Get('/')
  public async listShipments() {
    return await this.listShipmentsUseCase.run();
  }

  @Get('/:trackingNumber')
  public async findByTrackingNumber(
    @Param('trackingNumber') trackingNumber: string,
  ) {
    return await this.findShipmentByTrackingNumberUseCase.run(trackingNumber);
  }

  @Patch('/:trackingNumber/status')
  public async updateStatus(
    @Param('trackingNumber') trackingNumber: string,
    @Body() body: UpdateShipmentStatusDto,
  ) {
    return await this.updateShipmentStatusUseCase.run(
      trackingNumber,
      body.status,
    );
  }

  @Patch('/:trackingNumber/cancel')
  public async cancelShipment(@Param('trackingNumber') trackingNumber: string) {
    return await this.cancelShipmentUseCase.run(trackingNumber);
  }
}
