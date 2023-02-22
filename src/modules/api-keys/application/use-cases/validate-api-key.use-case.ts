import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import {
  API_KEY_GENERATOR_SERVICE,
  ApiKeyGeneratorService,
} from '@app/api-key-generator/api-key-generator.interface';
import { ApiKeyService } from '../../infrastructure/database/services/api-key.service';

@Injectable()
export class ValidateApiKeyUseCase {
  constructor(
    private readonly apiKeyService: ApiKeyService,

    @Inject(API_KEY_GENERATOR_SERVICE)
    private readonly apiKeyGeneratorService: ApiKeyGeneratorService,
  ) {}

  public async exec(key: string): Promise<boolean> {
    if (!this.apiKeyGeneratorService.isApiKey(key)) {
      throw new UnauthorizedException();
    }

    const apiKey = await this.apiKeyService.find({ key });

    if (!this.apiKeyGeneratorService.check(key, apiKey.keyUuid)) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
