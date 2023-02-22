import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';

import { FindShipmentsByUserIdUseCase } from './find-shipments-by-user-id.use-case';

describe('FindShipmentsByUserIdService', () => {
  let service: FindShipmentsByUserIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [FindShipmentsByUserIdUseCase],
    }).compile();

    service = module.get<FindShipmentsByUserIdUseCase>(
      FindShipmentsByUserIdUseCase,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
