import { Db, MongoClient } from 'mongodb';

import { getDatabaseConfig } from 'scripts/config/database';
import { getConnectionString } from 'src/core/utils/mongodb-connection-uri';

export async function getConnection(): Promise<MongoClient> {
  const config = getDatabaseConfig();

  const uri = getConnectionString(
    config.host,
    config.port,
    config.username,
    config.password,
    config.database,
  );

  const client = new MongoClient(uri);

  await client.connect();

  return client;
}

export function getDatabase(client: MongoClient, database: string): Db {
  const db = client.db(database);
  return db;
}

export async function closeConnection(client: MongoClient): Promise<void> {
  await client.close();
}
