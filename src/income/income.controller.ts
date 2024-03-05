import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { GetIncomeDto } from './dto/get-income.dto';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  create(@Body() body: CreateIncomeDto) {
    return this.incomeService.create(body);
  }

  @Post('get-income')
  findAll(@Body() body: GetIncomeDto) {
    console.log(body, 'INI CEK PAGE LIMIT PEMASUKAN')
    return this.incomeService.findAll(body);
  }

  @Put()
  update(@Body() body: UpdateIncomeDto) {
    return this.incomeService.update(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomeService.remove(id);
  }
}
