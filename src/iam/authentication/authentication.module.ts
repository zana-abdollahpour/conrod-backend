import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'domain/users/entities/user.entity';
import { LocalStrategy } from 'iam/authentication/strategies/local.strategy';
import { AuthenticationService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  providers: [AuthenticationService, LocalStrategy],
})
export class AuthenticationModule {}
