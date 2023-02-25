import { UserRequest } from '@app/common/types/http/user-request.type';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { Scopes } from 'src/modules/auth/application/decorators/scopes.decorator';
import { JwtGuard } from 'src/modules/auth/application/guards/jwt.guard';
import { CancelShipmentByTrackingNumberUseCase } from 'src/modules/customer/application/use-cases/cancel-shipment-by-tracking-number/cancel-shipment-by-tracking-number.use-case';
import { CreateShipmentUseCase } from 'src/modules/customer/application/use-cases/create-shipment/create-shipment.use-case';
import { FindShipmentByTrackingNumberUseCase } from 'src/modules/customer/application/use-cases/find-shipment-by-tracking-number/find-shipment-by-tracking-number.use-case';
import { FindShipmentsByUserIdUseCase } from 'src/modules/customer/application/use-cases/find-shipments-by-user-id/find-shipments-by-user-id.use-case';
import { CreateShipmentDto } from 'src/modules/shipments/infrastructure/http/dtos/create-shipment.dto';
import { ScopeGuard } from 'src/modules/auth/application/guards/scope.guard';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { CreateShipmentBulkUseCase } from 'src/modules/customer/application/use-cases/create-shipments-bulk/create-shipments-bulk.use-case';
import { CreateBulkDto } from 'src/modules/shipments/infrastructure/http/dtos/create-bulk-shipments.dto';
import { Bulk } from '@app/common/types/general/bulk.type';
import { BulkException } from '@app/common/types/general/bulk-exception.type';
import { Shipment } from 'src/modules/shipments/domain/interfaces/shipment.interface';

@ApiTags('Customers')
@Controller({ version: '1', path: 'customers/shipments' })
export class ShipmentsController {
  constructor(
    private readonly cancelShipmentByTrackingNumberUseCase: CancelShipmentByTrackingNumberUseCase,
    private readonly findShipmentByTrackingNumberUseCase: FindShipmentByTrackingNumberUseCase,
    private readonly findShipmentsByUserIdUseCase: FindShipmentsByUserIdUseCase,
    private readonly createShipmentUseCase: CreateShipmentUseCase,
    private readonly createShipmentBulkUseCase: CreateShipmentBulkUseCase,
  ) {}

  @ApiOperation({ summary: 'Create shipment' })
  @ApiBearerAuth()
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid token',
  })
  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.WEB)
  @Post('/')
  public create(@Body() body: CreateShipmentDto, @Req() req: UserRequest) {
    return this.createShipmentUseCase.run({ ...body, userId: req.user.id });
  }

  @ApiOperation({ summary: 'List shipments' })
  @ApiBearerAuth()
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid token',
  })
  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.WEB)
  @Get('/')
  public list(@Req() req: UserRequest) {
    return this.findShipmentsByUserIdUseCase.run(req.user.id);
  }

  @ApiOperation({ summary: 'Get shipment by tracking number' })
  @ApiBearerAuth()
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid token',
  })
  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.WEB)
  @Get('/:trackingNumber')
  public find(@Param('trackingNumber') trackingNumber: string) {
    return this.findShipmentByTrackingNumberUseCase.run(trackingNumber);
  }

  @ApiOperation({ summary: 'Cancel shipment by tracking number' })
  @ApiBearerAuth()
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid token',
  })
  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.WEB)
  @Patch('/:trackingNumber/cancel')
  public cancel(@Param('trackingNumber') trackingNumber: string) {
    return this.cancelShipmentByTrackingNumberUseCase.run(trackingNumber);
  }

  @ApiOperation({ summary: 'Create a collection of shipments' })
  @ApiBearerAuth()
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid token',
  })
  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.WEB)
  @Post('/bulk')
  @ApiBody({ type: CreateBulkDto })
  public createBulk(
    @Body() body: CreateBulkDto,
    @Req() req: UserRequest,
  ): Promise<Bulk<ShipmentEntity, BulkException<Partial<Shipment>>>> {
    return this.createShipmentBulkUseCase.run(body.shipments, req.user.id);
  }
}
