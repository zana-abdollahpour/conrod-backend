import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import jwtConfig from 'iam/authentication/config/jwt.config';
import { JwtAuthGuard } from 'iam/authentication/guards/jwt-auth.guard';
import { LoginValidationMiddleware } from 'iam/authentication/middlewares/login-validation.middleware';
import { JwtStrategy } from 'iam/authentication/strategies/jwt.strategy';
import { LocalStrategy } from 'iam/authentication/strategies/local.strategy';

import { AuthenticationController } from 'iam/authentication/authentication.controller';
import { AuthenticationService } from 'iam/authentication/authentication.service';
import { AuthorizationController } from 'iam/authorization/authorization.controller';
import { AuthorizationService } from 'iam/authorization/authorization.service';
import { AUTH_CONTROLLER_PREFIX } from 'iam/iam.constants';

import { User } from 'domain/users/entities/user.entity';

import { RolesGuard } from 'iam/authorization/guards/roles.guard';

import { BcryptService } from 'iam/hashing/bcrypt.service';
import { HashingService } from 'iam/hashing/hashing.abstract.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    PassportModule,
  ],
  controllers: [AuthenticationController, AuthorizationController],
  providers: [
    AuthenticationService,
    AuthorizationService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [HashingService],
})
export class IamModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginValidationMiddleware)
      .forRoutes(`${AUTH_CONTROLLER_PREFIX}/login`);
  }
}
