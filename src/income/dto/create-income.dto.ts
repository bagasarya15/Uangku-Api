import { IsNotEmpty } from "class-validator";

export class CreateIncomeDto {
  @IsNotEmpty({message: 'UserId expense is required'})
  user_id :string;

  @IsNotEmpty({message: 'CategoryId expense is required'})
  category_id :string;

  @IsNotEmpty({message: 'Name expense is required'})
  name :string;

  @IsNotEmpty({message: 'Nominal is required'})
  nominal : string;

  @IsNotEmpty({message: 'Income date is required'})
  income_datetime : Date;
}
