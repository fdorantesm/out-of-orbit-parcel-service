import { Injectable } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';
import { CreateShipmentDto } from 'src/modules/shipments/infrastructure/http/dtos/create-shipment.dto';

@Injectable()
export class CreateShipmentUseCase implements UseCase {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  public async run(payload: CreateShipmentDto): Promise<ShipmentEntity> {
    const shipment = await this.shipmentsService.create({
      origin: payload.origin,
      destination: payload.destination,
      packet: {
        ...payload.packet,
      },
    });

    return shipment;
  }
}
