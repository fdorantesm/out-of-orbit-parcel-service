import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class ShipmentPackageDto {
  @ApiProperty({ example: '14' })
  @IsPositive()
  public length: number;

  @ApiProperty({ example: '350' })
  @IsPositive()
  public weight: number;

  @ApiProperty({ example: '20' })
  @IsPositive()
  public width: number;

  @ApiProperty({ example: '14' })
  @IsPositive()
  public height: number;
}
