import { getDatabaseConfig } from 'scripts/config/database';
import {
  closeConnection,
  getConnection,
  getDatabase,
} from 'scripts/utils/mongodb';

export async function seedApiKeys() {
  const config = getDatabaseConfig();
  const connection = await getConnection();
  const db = getDatabase(connection, config.database);
  const collection = db.collection('apiKeys');
  await collection.insertOne({
    uuid: '22a3d2a4-c609-48a4-90f8-80d36ff4f731',
    name: 'root',
    key: '1BC6EPJ-NMYM3SY-MCPE175-N62WM7F',
    keyUuid: '0ad8675a-ad3d-41e7-a32c-e09ca985ca1d',
  });
  await closeConnection(connection);
}
