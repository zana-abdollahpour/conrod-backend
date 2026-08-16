import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AUTH_CONTROLLER_PREFIX,
  AuthenticationController,
} from 'iam/authentication/auth.controller';

import { User } from 'domain/users/entities/user.entity';
import { LoginValidationMiddleware } from 'iam/authentication/middlewares/login-validation.middleware';
import { LocalStrategy } from 'iam/authentication/strategies/local.strategy';
import { AuthenticationService } from './auth.service';

import jwtConfig from 'iam/authentication/config/jwt.config';
import { JwtAuthGuard } from 'iam/authentication/guards/jwt-auth.guard';
import { JwtStrategy } from 'iam/authentication/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    PassportModule,
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginValidationMiddleware)
      .forRoutes(`${AUTH_CONTROLLER_PREFIX}/login`);
  }
}
