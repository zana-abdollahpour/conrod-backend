import { Body, Controller, Param, Patch } from '@nestjs/common';
import { IdDto } from 'common/dto/id.dto';

import { AuthorizationService } from 'iam/authorization/authorization.service';
import { RoleDto } from 'iam/authorization/dto/role.dto';
import { AUTH_CONTROLLER_PREFIX } from 'iam/iam.constants';

@Controller(AUTH_CONTROLLER_PREFIX)
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Patch(':id/assign-role')
  assignRole(@Param() { id }: IdDto, @Body() { role }: RoleDto) {
    return this.authorizationService.assignRole(id, role);
  }
}
