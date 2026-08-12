import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const DATABASE_CONFIG = {
  useFactory: () => ({
    type: 'postgres',
    url: process.env.DATASOURCE_URL,
    autoLoadEntities: true,
  }),
} as const satisfies TypeOrmModuleAsyncOptions;
