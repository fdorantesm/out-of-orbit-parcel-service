import { ApiKeyEntity } from 'src/modules/api-keys/domain/entities/apikey.entity';

export const API_KEY_SERVICE = 'ApiKeyService';

export interface IApiKeyService {
  create(apiKey: ApiKeyEntity): Promise<ApiKeyEntity>;
  find(apiKeyEntity: Partial<ApiKeyEntity>);
}
