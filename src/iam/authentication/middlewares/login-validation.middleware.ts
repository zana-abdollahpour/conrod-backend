import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { LoginDto } from 'iam/authentication/dto/login.dto';

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const loginDto = plainToInstance(LoginDto, req.body);

    const errors = await validate(loginDto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length) {
      const errorMessages = errors.flatMap((e) => Object.values(e.constraints));
      throw new BadRequestException(errorMessages);
    }

    next();
  }
}
