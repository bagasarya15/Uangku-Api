import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomeDto } from './create-income.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateIncomeDto extends PartialType(CreateIncomeDto) {
  @IsNotEmpty({message: 'Id is required'})
  id:string
}
