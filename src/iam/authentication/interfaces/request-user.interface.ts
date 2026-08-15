import { User } from 'domain/users/entities/user.entity';

export interface RequestUser {
  readonly id: User['id'];
}
