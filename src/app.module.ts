import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './domain/users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, CommonModule, DatabaseModule],
})
export class AppModule {}
