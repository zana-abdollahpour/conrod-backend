import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RequestUser } from 'iam/authentication/interfaces/request-user.interface';

import { ROLES_KEY } from 'iam/authorization/decorators/roles.decorator';
import { Role } from 'iam/authorization/enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const user = context.switchToHttp().getRequest<Request>()[
      'user'
    ] as RequestUser;

    // based on business logic, admin can do anything
    if (user.role === Role.ADMIN) {
      return true;
    }

    return requiredRoles.includes(user.role);
  }
}
