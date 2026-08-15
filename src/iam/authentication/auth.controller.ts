import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthenticationService } from 'iam/authentication/auth.service';
import { CurrentUser } from 'iam/authentication/decorators/current-user.decorator';
import { LocalAuthGuard } from 'iam/authentication/guards/local-auth.guard';
import type { RequestUser } from 'iam/authentication/interfaces/request-user.interface';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@CurrentUser() currentUser: RequestUser) {
    return currentUser;
  }
}
