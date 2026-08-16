import { SetMetadata } from '@nestjs/common';
import { NonEmptyArray } from 'common/util/type.utils';

import { Role } from 'iam/authorization/enum/roles.enum';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: NonEmptyArray<Role>) =>
  SetMetadata(ROLES_KEY, roles);
