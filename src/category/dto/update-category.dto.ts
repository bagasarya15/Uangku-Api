import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNotEmpty({ message: 'Id is required' })
  id: string;

  @IsNotEmpty({ message: 'Category name is required' })
  category_name: string;

  @IsNotEmpty({ message: 'Category type is required' })
  category_type: string;

  @IsNotEmpty({ message: 'User id is required' })
  user_id: string;
}

