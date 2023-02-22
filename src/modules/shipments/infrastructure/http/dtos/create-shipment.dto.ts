import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ShipmentPackageDto } from './shipment-package.dto';
import { ShipmentAddressDto } from './shipment-address.dto';

export class CreateShipmentDto {
  @ApiProperty({ example: '' })
  @Type(() => ShipmentAddressDto)
  @ValidateNested()
  public origin: ShipmentAddressDto;

  @ApiProperty({ example: '' })
  @Type(() => ShipmentAddressDto)
  @ValidateNested()
  public destination: ShipmentAddressDto;

  @ApiProperty({ example: '' })
  public packet: ShipmentPackageDto;
}
