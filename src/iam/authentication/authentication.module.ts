import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'domain/users/entities/user.entity';
import { AUTH_CONTROLLER_PREFIX } from 'iam/authentication/auth.controller';
import { LoginValidationMiddleware } from 'iam/authentication/middlewares/login-validation.middleware';
import { LocalStrategy } from 'iam/authentication/strategies/local.strategy';
import { AuthenticationService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  providers: [AuthenticationService, LocalStrategy],
})
export class AuthenticationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginValidationMiddleware)
      .forRoutes(`${AUTH_CONTROLLER_PREFIX}/login`);
  }
}
