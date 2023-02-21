import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ApiKeyModel } from '../models';
import { ApiKeyEntity } from 'src/modules/api-keys/domain/entities/apikey.entity';

@Injectable()
export class ApiKeyRepository {
  constructor(
    @InjectModel(ApiKeyModel.name)
    private readonly apiKeyModel: Model<ApiKeyModel>,
  ) {}

  public async create(apiKeyEntity: ApiKeyEntity): Promise<ApiKeyEntity> {
    const apiKey = await this.apiKeyModel.create(apiKeyEntity);
    return ApiKeyEntity.create(
      apiKey.uuid,
      apiKey.name,
      apiKey.key,
      apiKey.keyUuid,
    );
  }

  public async find(
    apiKeyEntity: Partial<ApiKeyEntity>,
  ): Promise<ApiKeyEntity> {
    const apiKey = await this.apiKeyModel.findOne(apiKeyEntity);
    if (apiKey) {
      return ApiKeyEntity.create(
        apiKey.uuid,
        apiKey.name,
        apiKey.key,
        apiKey.keyUuid,
      );
    }
  }
}
