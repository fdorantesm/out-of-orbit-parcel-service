import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import { configSchema } from './schemas/config.schema';
import { serverConfigLoader } from './loaders/server.loader';
import { environmentConfigLoader } from './loaders/environment.loader';

const envFilePath = (): string => {
  const isTesting = process.env.NODE_ENV === 'testing';
  return isTesting ? '.env.testing' : '.env';
};

export const configOptions: ConfigModuleOptions = {
  envFilePath: envFilePath(),
  cache: true,
  isGlobal: true,
  load: [serverConfigLoader, environmentConfigLoader],
  validationSchema: configSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
