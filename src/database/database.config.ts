import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  () =>
    ({
      type: 'postgres',
      url: process.env.DATASOURCE_URL,
      autoLoadEntities: true,
    }) as const satisfies TypeOrmModuleOptions,
);
