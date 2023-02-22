import { ID_GENERATOR_SERVICE, IdGeneratorService } from '@app/id-generator';
import { ShortIdGeneratorService } from '@app/short-id-generator';
import { Inject, Injectable } from '@nestjs/common';
import { PromisePool } from '@supercharge/promise-pool';
import * as chunk from 'lodash/chunk';

import { UseCase } from 'libs/domain/src';
import { ShipmentEntity } from 'src/modules/shipments/domain/entities/shipment.entity';
import { PackageWeightTooHeavyException } from 'src/modules/shipments/domain/exceptions/package-weight-too-heavy.exception';
import { ShipmentsService } from 'src/modules/shipments/infrastructure/database/services/shipments.service';
import { DateService } from 'src/modules/shared/services/date.service';
import { CreateShipmentRequestContext } from '../../interfaces/create-shipment/request-context.interface';

@Injectable()
export class CreateShipmentsBulkUseCase implements UseCase {
  constructor(
    private readonly shipmentsService: ShipmentsService,
    private readonly dateService: DateService,
    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorModule: IdGeneratorService,
    private readonly shortIdGeneratorService: ShortIdGeneratorService,
  ) {}

  public async run(shipmentsSet: CreateShipmentRequestContext[]): Promise<any> {
    const result = await PromisePool.withConcurrency(1)
      .for(chunk(shipmentsSet, 50))
      .process(async (chunk: CreateShipmentRequestContext[]) => {
        const shipments = chunk.map((part) => {
          if (ShipmentEntity.isTooHeavy(part.packet.weight)) {
            throw new PackageWeightTooHeavyException();
          }

          const packet = {
            ...part.packet,
            size: ShipmentEntity.calcSize(part.packet.weight),
          };

          return {
            packet,
            uuid: this.idGeneratorModule.exec(),
            trackingNumber: this.shortIdGeneratorService.exec(),
            origin: part.origin,
            destination: part.destination,
            status: ShipmentEntity.getInitialStatus(),
            userId: part.userId,
            createdAt: this.dateService.create(),
          };
        });

        const shipment = await this.shipmentsService.createBulk(shipments);

        return shipment;
      });

    console.log(result);
  }
}
