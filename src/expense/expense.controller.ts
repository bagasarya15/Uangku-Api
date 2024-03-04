import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { GetExpenseDto } from './dto/get-expense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() body: CreateExpenseDto) {
    return this.expenseService.create(body);
  }

  @Post('get-expense')
  findAll(@Body() body: GetExpenseDto) {
    console.log(body, 'INI CEK PAGE LIMIT PENGELUARAN')
    return this.expenseService.findAll(body);
  }

  @Put()
  update(@Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }
}
