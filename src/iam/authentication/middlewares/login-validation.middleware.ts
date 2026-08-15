import { createValidationMiddleware } from 'common/middlewares/validation.factory.middleware';
import { LoginDto } from 'iam/authentication/dto/login.dto';

export const LoginValidationMiddleware = createValidationMiddleware(LoginDto);
