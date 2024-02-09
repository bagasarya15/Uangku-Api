import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  id: string;

  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsOptional()
  // @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  image: string;
}
