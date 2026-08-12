import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvExpand.expand(dotenv.config());

const DATASOURCE_OPTIONS = {
  type: 'postgres',
  url: process.env.DATASOURCE_URL,
  entities: ['dist/domain/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
} satisfies DataSourceOptions;

export default new DataSource(DATASOURCE_OPTIONS);
