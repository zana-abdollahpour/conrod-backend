import { ForbiddenException } from '@nestjs/common';
import { RequestUser } from 'iam/authentication/interfaces/request-user.interface';
import { Role } from 'iam/authorization/enum/roles.enum';

/**
 * Asserts that the current user has access to the target user's resource.
 * Access is granted if:
 * 1. User has one of the expected roles (bypass), OR
 * 2. User owns the resource (targetUserId matches currentUser.id)
 *
 * @throws {ForbiddenException} If access is denied
 */
export const assertUserAccess = (
  targetUserId: RequestUser['id'],
  currentUser: RequestUser,
  expectedRoles: Role[] = [Role.ADMIN],
): void => {
  const hasBypassRole = expectedRoles.includes(currentUser.role);
  const isResourceOwner = targetUserId === currentUser.id;

  if (!hasBypassRole && !isResourceOwner) {
    const requiredRoles = expectedRoles.join(' or ');
    throw new ForbiddenException(
      `Access denied. Requires ${requiredRoles} role or ownership of this resource`,
    );
  }
};
