import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { CreateShipmentDto } from './create-shipment.dto';

export class CreateBulkDto {
  @ApiProperty()
  @Type(() => CreateShipmentDto)
  @ValidateNested()
  public shipments: CreateShipmentDto[];
}
