import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'domain/users/entities/user.entity';
import { IamModule } from 'iam/iam.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [IamModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
