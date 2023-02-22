import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { ValidateApiKeyUseCase } from 'src/modules/auth/application/use-cases/validate-api-key.use-case';

@Injectable()
export class BearerStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private validateApiKeyUseCase: ValidateApiKeyUseCase) {
    super({ header: 'Authorization', prefix: 'ApiKey ' }, false);
  }

  async validate(apiKey: string): Promise<boolean> {
    return this.validateApiKeyUseCase.run(apiKey);
  }
}
