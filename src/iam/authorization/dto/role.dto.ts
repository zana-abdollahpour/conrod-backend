import { IsEnum } from 'class-validator';
import { Role } from 'iam/authorization/enum/roles.enum';

export class RoleDto {
  @IsEnum(Role)
  role: Role;
}
