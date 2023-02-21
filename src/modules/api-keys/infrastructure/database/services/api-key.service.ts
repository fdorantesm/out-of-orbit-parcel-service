import { Inject, Injectable } from '@nestjs/common';

import {
  IdGeneratorService,
  ID_GENERATOR_SERVICE,
} from 'libs/id-generator/src';
import { ApiKeyRepository } from '../repositories/api-key.repository';
import { ApiKeyEntity } from 'src/modules/api-keys/domain/entities/apikey.entity';

@Injectable()
export class ApiKeyService {
  constructor(
    private readonly apiKeyRepository: ApiKeyRepository,

    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  public create(apiKey: ApiKeyEntity): Promise<ApiKeyEntity> {
    const uuid = this.idGeneratorService.exec();
    return this.apiKeyRepository.create({ uuid, ...apiKey });
  }

  public find(apiKeyEntity: Partial<ApiKeyEntity>) {
    return this.apiKeyRepository.find(apiKeyEntity);
  }
}
