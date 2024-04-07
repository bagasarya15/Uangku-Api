import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { expense, income } from '../../models';

@Module({
  imports: [SequelizeModule.forFeature([income, expense])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
