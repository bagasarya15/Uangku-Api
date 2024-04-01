import { Injectable } from '@nestjs/common';
import { FilterDashboardDto } from './dto/filter-dashboard.dto';
import { expense } from '../../models';
import { Op } from 'sequelize';
@Injectable()
export class DashboardService {
  constructor() {}

  async indexDashboard(body: FilterDashboardDto): Promise<any> {
    try {
      const { user_id, start_date, end_date } = body;

      if (user_id && start_date && end_date) {
        const expenses = await expense.sum('nominal', {
          where: {
            user_id: user_id,
            expense_datetime: {
              [Op.between]: [start_date, end_date],
            },
          },
        });
        return { status: 200, message: 'success', records: expenses };
      } else {
        const expenses = await expense.sum('nominal', {
          where: {
            user_id: user_id,
          },
        });
        return { status: 200, message: 'success', records: expenses };
      }
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }
}
