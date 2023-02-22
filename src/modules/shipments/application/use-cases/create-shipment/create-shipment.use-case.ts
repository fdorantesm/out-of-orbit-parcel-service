import { ID_GENERATOR_SERVICE, IdGeneratorService } from '@app/id-generator';
import { ShortIdGeneratorService } from '@app/short-id-generator';
import { Inject, Injectable } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { PackageWeightTooHeavyException } from 'src/modules/shipments/domain/exceptions/package-weight-too-heavy.exception';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';
import { DateService } from 'src/modules/shared/services/date.service';
import { CreateShipmentRequestContext } from '../../interfaces/create-shipment/request-context.interface';

@Injectable()
export class CreateShipmentUseCase implements UseCase {
  constructor(
    private readonly shipmentsService: ShipmentsService,
    private readonly dateService: DateService,
    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorModule: IdGeneratorService,
    private readonly shortIdGeneratorService: ShortIdGeneratorService,
  ) {}

  public async run(
    payload: CreateShipmentRequestContext,
  ): Promise<ShipmentEntity> {
    if (ShipmentEntity.isTooHeavy(payload.packet.weight)) {
      throw new PackageWeightTooHeavyException();
    }

    const uuid = this.idGeneratorModule.exec();
    const size = ShipmentEntity.calcSize(payload.packet.weight);

    const shipment = await this.shipmentsService.create({
      uuid,
      trackingNumber: this.shortIdGeneratorService.exec(),
      origin: payload.origin,
      destination: payload.destination,
      packet: {
        ...payload.packet,
        size,
      },
      status: ShipmentEntity.getInitialStatus(),
      userId: payload.userId,
      createdAt: this.dateService.create(),
    });

    return shipment;
  }
}
