import { Injectable } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { PackageWeightTooHeavyException } from 'src/modules/shipments/domain/exceptions/package-weight-too-heavy.exception';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';
import { CreateShipmentDto } from 'src/modules/shipments/infrastructure/http/dtos/create-shipment.dto';

@Injectable()
export class CreateShipmentUseCase implements UseCase {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  public async run(payload: CreateShipmentDto): Promise<ShipmentEntity> {
    if (ShipmentEntity.isTooHeavy(payload.packet.weight)) {
      throw new PackageWeightTooHeavyException();
    }

    const shipment = await this.shipmentsService.create(payload);

    return shipment;
  }
}
