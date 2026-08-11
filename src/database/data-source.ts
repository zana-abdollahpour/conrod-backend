import { DATABASE_CONFIG } from 'database/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';

// TODO: fix issues via config module
const DATASOURCE_OPTIONS = {
  type: DATABASE_CONFIG.type,
  username: DATABASE_CONFIG.username,
  password: DATABASE_CONFIG.password,
  database: DATABASE_CONFIG.database,
  host: DATABASE_CONFIG.host,
  port: DATABASE_CONFIG.port,
  entities: ['dist/domain/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
} satisfies DataSourceOptions;

export default new DataSource(DATASOURCE_OPTIONS);
