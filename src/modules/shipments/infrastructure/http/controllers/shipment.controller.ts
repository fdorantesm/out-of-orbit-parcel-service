import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CancelShipmentUseCase } from 'src/modules/shipments/application/use-cases/cancel-shipment/cancel-shipment.use-case';
import { FindShipmentByTrackingNumberUseCase } from 'src/modules/shipments/application/use-cases/find-shipment-by-tracking-number/find-shipment-by-tracking-number.use-case';
import { ListShipmentsUseCase } from 'src/modules/shipments/application/use-cases/list-shipments/list-shipments.use-case';
import { UpdateShipmentStatusUseCase } from 'src/modules/shipments/application/use-cases/update-shipment-status/update-shipment-status.use-case';
import { UpdateShipmentStatusDto } from '../dtos/update-shipment-status.dto';
import { BearerAuthGuard } from 'src/modules/auth/application/guards/bearer.guard';

@ApiTags('Shipments')
@Controller({
  version: '1',
  path: 'shipments',
})
export class ShipmentController {
  constructor(
    private readonly cancelShipmentUseCase: CancelShipmentUseCase,
    private readonly findShipmentByTrackingNumberUseCase: FindShipmentByTrackingNumberUseCase,
    private readonly listShipmentsUseCase: ListShipmentsUseCase,
    private readonly updateShipmentStatusUseCase: UpdateShipmentStatusUseCase,
  ) {}

  @ApiOperation({ summary: 'Create shipment' })
  @ApiSecurity('Authorization')
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid token',
  })
  @UseGuards(BearerAuthGuard)
  @Get('/')
  public async listShipments() {
    return await this.listShipmentsUseCase.run();
  }

  @ApiOperation({ summary: 'Create shipment' })
  @ApiSecurity('Authorization')
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid token',
  })
  @UseGuards(BearerAuthGuard)
  @Get('/:trackingNumber')
  public async findByTrackingNumber(
    @Param('trackingNumber') trackingNumber: string,
  ) {
    return await this.findShipmentByTrackingNumberUseCase.run(trackingNumber);
  }

  @ApiOperation({ summary: 'Create shipment' })
  @ApiSecurity('Authorization')
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid token',
  })
  @UseGuards(BearerAuthGuard)
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

  @ApiOperation({ summary: 'Create shipment' })
  @ApiSecurity('Authorization')
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid token',
  })
  @UseGuards(BearerAuthGuard)
  @Patch('/:trackingNumber/cancel')
  public async cancelShipment(@Param('trackingNumber') trackingNumber: string) {
    return await this.cancelShipmentUseCase.run(trackingNumber);
  }
}
