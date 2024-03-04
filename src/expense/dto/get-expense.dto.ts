import { IsNotEmpty } from "class-validator";

export class GetExpenseDto {
  page: number;
  limit: number;
  search: string;
  user_id: string;
}
