import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LocationDto } from './shipment-location.dto';
import { Type } from 'class-transformer';

export class ShipmentAddressDto {
  @ApiProperty({ example: 'Plaza de la república' })
  @IsString()
  @IsNotEmpty()
  public street: string;

  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  public extNumber: string;

  @ApiProperty({ example: '1' })
  @IsString()
  @IsOptional()
  public intNumber?: string;

  @ApiProperty({ example: 'Centro' })
  @IsString()
  @IsNotEmpty()
  public neighborhood: string;

  @ApiProperty({ example: '06000' })
  @IsString()
  @IsNotEmpty()
  @Matches(/[0-9]{5}/)
  public zipCode: string;

  @ApiProperty({ example: 'Cuauhtémoc' })
  @IsString()
  @IsNotEmpty()
  public city: string;

  @ApiProperty({ example: 'Ciudad de México' })
  @IsString()
  @IsNotEmpty()
  public state: string;

  @ApiProperty()
  @Type(() => LocationDto)
  public location: LocationDto;
}
