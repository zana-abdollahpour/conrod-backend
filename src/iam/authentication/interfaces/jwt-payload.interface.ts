import { User } from 'domain/users/entities/user.entity';

export interface JwtPayload {
  readonly sub: User['id'];
}
