import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Category name is required' })
  category_name: string;

  @IsNotEmpty({ message: 'Category type is required' })
  category_type: string;

  @IsNotEmpty({ message: 'User id is required' })
  user_id: string;
}
