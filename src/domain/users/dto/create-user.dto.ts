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

  @IsPassword()
  password: string;
}
