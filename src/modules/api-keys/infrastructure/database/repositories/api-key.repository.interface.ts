import { ApiKeyEntity } from 'src/modules/api-keys/domain/entities/apikey.entity';

export interface ApiKeyRepository {
  create(apiKeyEntity: ApiKeyEntity): Promise<ApiKeyEntity>;
  find(apiKeyEntity: Partial<ApiKeyEntity>): Promise<ApiKeyEntity>;
}

export const API_KEY_REPOSITORY = 'ApiKeyRepository';
