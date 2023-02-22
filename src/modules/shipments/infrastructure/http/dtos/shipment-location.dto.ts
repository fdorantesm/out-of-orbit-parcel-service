import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude } from 'class-validator';

export class LocationDto {
  @ApiProperty({ example: '19.42847' })
  @IsLatitude()
  public latitude: number;

  @ApiProperty({ example: '-99.12766' })
  @IsLongitude()
  public longitude: number;
}
