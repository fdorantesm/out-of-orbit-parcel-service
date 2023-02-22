import { Module } from '@nestjs/common';
import { ShortIdGeneratorService } from './short-id-generator.service';

@Module({
  providers: [ShortIdGeneratorService],
  exports: [ShortIdGeneratorService],
})
export class ShortIdGeneratorModule {}
