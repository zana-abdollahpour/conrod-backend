import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// TODO: fix security issues with config module
export const DATABASE_CONFIG = {
  type: 'postgres',
  username: 'postgres',
  password: 'postgres',
  database: 'conrod',
  host: 'localhost',
  port: 4321,
  autoLoadEntities: true,
} satisfies TypeOrmModuleOptions;
