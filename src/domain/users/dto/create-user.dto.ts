import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

import { IsPassword } from 'common/decorators/validators/is-password.decorator';

export class CreateUserDto {
  @IsString()
  @Length(2, 40)
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('US')
  phone: string;

  /**
   * Requires:
   * 1. 8 to 20 characters
   * 2. At least one
   * - Lowercase letter
   * - Uppercase letter
   * - Number
   * - Special character
   */
  @IsPassword()
  password: string;
}
