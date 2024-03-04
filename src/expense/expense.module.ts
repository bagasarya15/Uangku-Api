import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { category } from '../../models';

@Module({
  imports: [
    SequelizeModule.forFeature([category]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
