export class ApiKeyEntity {
  uuid: string;

  name: string;

  key: string;

  keyUuid: string;

  private constructor(
    uuid: string,
    name: string,
    key: string,
    keyUuid: string,
  ) {
    this.uuid = uuid;
    this.name = name;
    this.key = key;
    this.keyUuid = keyUuid;
  }

  static create(uuid: string, name: string, key: string, keyUuid: string) {
    return new ApiKeyEntity(uuid, name, key, keyUuid);
  }
}
