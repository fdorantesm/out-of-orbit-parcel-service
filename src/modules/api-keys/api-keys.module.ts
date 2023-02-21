import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { QueryHandlers } from './domain/queries';
import { ValidateApiKeyUseCase } from './application/use-cases/validate-api-key.use-case';
import { ApiKeyModelInstance } from './infrastructure/database/models';
import { ApiKeyRepository } from './infrastructure/database/repositories/api-key.repository';
import { ApiKeyService } from './infrastructure/database/services/api-key.service';
import { IdGeneratorModule } from '@app/id-generator';
import { ApikeyGeneratorModule } from '@app/api-key-generator';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([ApiKeyModelInstance]),
    IdGeneratorModule,
    ApikeyGeneratorModule,
  ],
  providers: [
    ...QueryHandlers,
    ApiKeyService,
    ApiKeyRepository,
    ValidateApiKeyUseCase,
  ],
})
export class ApiKeysModule {}
