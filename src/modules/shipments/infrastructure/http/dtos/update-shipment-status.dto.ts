import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { ShipmentStatus } from 'src/modules/shipments/domain/enums/status.enum';
import { UpdatableShipmentStatus } from 'src/modules/shipments/domain/types/updatable-status.type';

export class UpdateShipmentStatusDto {
  @ApiProperty({ example: ShipmentStatus.COLLECTED })
  @IsEnum([
    ShipmentStatus.COLLECTED,
    ShipmentStatus.DELIVERED,
    ShipmentStatus.IN_WAREHOUSE,
    ShipmentStatus.IN_WAREHOUSE,
    ShipmentStatus.ON_DELIVERY,
  ])
  public status: UpdatableShipmentStatus;
}
