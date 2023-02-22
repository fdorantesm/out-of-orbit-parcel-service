import { Test, TestingModule } from '@nestjs/testing';
import { CreateShipmentUseCase } from './create-shipment.use-case';
import { CqrsModule } from '@nestjs/cqrs';

describe('CreateShipmentService', () => {
  let service: CreateShipmentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [CreateShipmentUseCase],
    }).compile();

    service = module.get<CreateShipmentUseCase>(CreateShipmentUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
