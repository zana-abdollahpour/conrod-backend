import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import type { RequestUser } from 'iam/authentication/interfaces/request-user.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>();
    return req.user as RequestUser;
  },
);
