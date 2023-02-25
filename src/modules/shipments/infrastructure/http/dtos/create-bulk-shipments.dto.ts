import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { CreateShipmentDto } from './create-shipment.dto';

export class CreateBulkDto {
  @ApiProperty({ isArray: true, type: CreateShipmentDto })
  @IsObject()
  @Type(() => CreateShipmentDto)
  @ValidateNested({ each: true })
  public shipments: CreateShipmentDto[];
}
