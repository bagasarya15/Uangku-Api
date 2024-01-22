import { IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsNotEmpty({ message: 'username or email is required' })
  usernameOrEmail: string;

  // @IsOptional()
  // @IsEmail({}, { message: 'email must be a valid email address' })
  // email: string;

  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
