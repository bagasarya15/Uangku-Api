import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  // @IsNotEmpty({ message: 'Status is required' })
  // is_active: boolean;
  // @IsNotEmpty({ message: 'Email is required' })
  // @IsEmail({ require_tld: true }, { message: 'Invalid email format' })
  // email: string;
}
