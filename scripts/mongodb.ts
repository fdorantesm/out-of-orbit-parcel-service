import * as dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config({
  path: '.env.testing',
});

async function bootstrap() {
  await MongoMemoryServer.create({
    instance: {
      port: parseInt(process.env.DB_PORT, 10),
    },
  });
}

bootstrap();
