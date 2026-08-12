import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DATABASE_CONFIG } from './database.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(DATABASE_CONFIG)],
})
export class DatabaseModule {}
