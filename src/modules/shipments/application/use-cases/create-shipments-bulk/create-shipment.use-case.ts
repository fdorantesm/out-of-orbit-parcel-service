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
import { Bulk } from '@app/common/types/general/bulk.type';
import { BulkException } from '@app/common/types/general/bulk-exception.type';
import { Shipment } from 'src/modules/shipments/domain/interfaces/shipment.interface';

@Injectable()
export class CreateShipmentsBulkUseCase implements UseCase {
  constructor(
    private readonly shipmentsService: ShipmentsService,
    private readonly dateService: DateService,
    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorModule: IdGeneratorService,
    private readonly shortIdGeneratorService: ShortIdGeneratorService,
  ) {}

  public async run(
    shipmentsSet: CreateShipmentRequestContext[],
  ): Promise<Bulk<ShipmentEntity, BulkException<Partial<Shipment>>>> {
    const errors: BulkException<Partial<Shipment>>[] = [];
    const task = await PromisePool.withConcurrency(50)
      .for(chunk(shipmentsSet, 50))
      .process(async (chunk: CreateShipmentRequestContext[]) => {
        const shipments = chunk.map((part) => ({
          uuid: this.idGeneratorModule.exec(),
          trackingNumber: this.shortIdGeneratorService.exec(),
          origin: part.origin,
          destination: part.destination,
          packet: {
            ...part.packet,
            size: ShipmentEntity.calcSize(part.packet.weight),
          },
          status: ShipmentEntity.getInitialStatus(),
          userId: part.userId,
          createdAt: this.dateService.create(),
        }));

        shipments
          .filter((shipment) =>
            ShipmentEntity.isTooHeavy(shipment.packet.weight),
          )
          .forEach((shipment) =>
            errors.push({
              payload: shipment,
              error: new PackageWeightTooHeavyException().toJson(),
            }),
          );

        const bulk = await this.shipmentsService.createBulk(
          shipments.filter(
            (shipment) => !ShipmentEntity.isTooHeavy(shipment.packet.weight),
          ),
        );

        return bulk;
      });

    return {
      errors,
      items: task.results.flat(),
    };
  }
}
