import { Injectable } from '@nestjs/common';
import * as utility from 'utility';

@Injectable()
export class ShortIdGeneratorService {
  public exec(
    length = 12,
    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ): string {
    return utility.randomString(length, chars);
  }
}
