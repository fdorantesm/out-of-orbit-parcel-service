import * as dotenv from 'dotenv';
import { Command } from 'commander';

import { seedApiKeys } from './commands/seed-api-keys';

dotenv.config();

function bootstrap() {
  const program = new Command();

  program
    .command('seed-api-keys')
    .description('Seed an initial API key')
    .action(seedApiKeys);

  program.parse();
}

bootstrap();
