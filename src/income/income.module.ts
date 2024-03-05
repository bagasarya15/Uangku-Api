import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { category } from '../../models';

@Module({
  imports: [
    SequelizeModule.forFeature([category]),
  ],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
