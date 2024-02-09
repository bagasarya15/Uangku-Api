import { IsOptional } from 'class-validator';

export class GetUserDto {
  @IsOptional()
  page: any;
  
  @IsOptional()
  limit: any;
}
