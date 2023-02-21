import { Module } from '@nestjs/common';
import { API_KEY_GENERATOR_SERVICE } from '.';
import { UuidApikeyGeneratorService } from './uuid-api-key-generator.service';

@Module({
  providers: [
    {
      provide: API_KEY_GENERATOR_SERVICE,
      useClass: UuidApikeyGeneratorService,
    },
  ],
  exports: [API_KEY_GENERATOR_SERVICE],
})
export class ApikeyGeneratorModule {}
