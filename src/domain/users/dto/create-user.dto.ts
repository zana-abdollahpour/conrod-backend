import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 40)
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('US')
  phone: string;

  @IsString()
  password: string;
}
