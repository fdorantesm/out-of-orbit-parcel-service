import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindApiKeyQuery } from './find-api-key.query';
import { ValidateApiKeyUseCase } from 'src/modules/api-keys/application/use-cases/validate-api-key.use-case';

@QueryHandler(FindApiKeyQuery)
export class FindApiKeyQueryHandler implements IQueryHandler<FindApiKeyQuery> {
  constructor(private readonly validateApiKeyUseCase: ValidateApiKeyUseCase) {}

  public execute(query: FindApiKeyQuery): Promise<boolean> {
    return this.validateApiKeyUseCase.exec(query.key);
  }
}
