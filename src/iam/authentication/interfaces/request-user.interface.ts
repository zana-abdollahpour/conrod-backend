import { User } from 'domain/users/entities/user.entity';
import { Role } from 'iam/authorization/enum/roles.enum';

export interface RequestUser {
  readonly id: User['id'];
  readonly role: Role;
}
