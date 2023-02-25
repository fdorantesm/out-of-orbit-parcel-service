import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({ example: 'user@awesomeapps.local' })
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'hkQjS0q((?aSc' })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;
}
