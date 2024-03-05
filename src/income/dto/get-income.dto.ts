import { IsNotEmpty } from "class-validator";

export class GetIncomeDto {
  page: number;
  limit: number;
  search: string;
  user_id: string;
}
