import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';

import { AuthenticationService } from 'iam/authentication/authentication.service';
import { CurrentUser } from 'iam/authentication/decorators/current-user.decorator';
import { Public } from 'iam/authentication/decorators/public.decorator';
import { LocalAuthGuard } from 'iam/authentication/guards/local-auth.guard';
import type { RequestUser } from 'iam/authentication/interfaces/request-user.interface';
import { AUTH_CONTROLLER_PREFIX } from 'iam/iam.constants';

@Controller(AUTH_CONTROLLER_PREFIX)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  login(
    @CurrentUser() currentUser: RequestUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = this.authenticationService.login(currentUser);
    response.cookie('token', token, {
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    });
  }

  @Get('profile')
  getProfile(@CurrentUser() { id }: RequestUser) {
    return this.authenticationService.getProfile(id);
  }
}
