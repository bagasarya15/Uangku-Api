import { IsOptional } from 'class-validator';

export class FilterDashboardDto {
  @IsOptional()
  user_id: string;

  @IsOptional()
  start_date: Date;

  @IsOptional()
  end_date: Date;
}
