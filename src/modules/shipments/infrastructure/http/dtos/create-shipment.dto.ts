import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ShipmentPackageDto } from './shipment-package.dto';
import { ShipmentAddressDto } from './shipment-address.dto';

export class CreateShipmentDto {
  @ApiProperty({ type: ShipmentAddressDto })
  @IsObject()
  @Type(() => ShipmentAddressDto)
  @ValidateNested({ each: true })
  public origin: ShipmentAddressDto;

  @ApiProperty({ type: ShipmentAddressDto })
  @IsObject()
  @Type(() => ShipmentAddressDto)
  @ValidateNested({ each: true })
  public destination: ShipmentAddressDto;

  @ApiProperty({ type: ShipmentPackageDto })
  @IsObject()
  @Type(() => ShipmentPackageDto)
  @ValidateNested({ each: true })
  public packet: ShipmentPackageDto;
}
