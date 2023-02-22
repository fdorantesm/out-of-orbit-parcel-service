import { MongoMemoryServer } from 'mongodb-memory-server';

export const getMongoMemory = async () => {
  return MongoMemoryServer.create();
};
