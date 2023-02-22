import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { UseCase } from 'libs/domain/src';
import { FindApiKeyQuery } from 'src/modules/api-keys/domain/queries';

@Injectable()
export class ValidateApiKeyUseCase implements UseCase {
  constructor(private readonly queryBus: QueryBus) {}

  public run(apiKey: string): Promise<boolean> {
    return this.queryBus.execute(new FindApiKeyQuery(apiKey));
  }
}
