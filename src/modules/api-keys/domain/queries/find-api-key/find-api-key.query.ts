import { IQuery } from '@nestjs/cqrs';

export class FindApiKeyQuery implements IQuery {
  constructor(public key: string) {}
}
