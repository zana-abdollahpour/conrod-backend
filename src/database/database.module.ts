import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from 'database/database.config';
import { DatabaseExceptionFilter } from 'database/exception-filters/database-exception.filter';
import { NotFoundExceptionFilter } from 'database/exception-filters/not-found-exception.filter';
import { SeedingModule } from './seeding/seeding.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    SeedingModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: NotFoundExceptionFilter },
    { provide: APP_FILTER, useClass: DatabaseExceptionFilter },
  ],
})
export class DatabaseModule {}
