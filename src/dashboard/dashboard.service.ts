import { Injectable } from '@nestjs/common';
import { FilterDashboardDto, FilterPengeluaranByCategoryDto } from './dto/filter-dashboard.dto';
import { expense, income } from '../../models';
import { Op } from 'sequelize';
import { startOfMonth, endOfMonth } from 'date-fns';

@Injectable()
export class DashboardService {
  constructor() {}

  async indexDashboard(body: FilterDashboardDto): Promise<any> {
    try {
      const { user_id, start_date, end_date } = body;

      const today = new Date();
      const firstDayOfMonth = startOfMonth(today);
      const lastDayOfMonth = endOfMonth(today);

      if (user_id && start_date && end_date) {
        const expenses = await expense.sum('nominal', {
          where: {
            user_id: user_id,
            expense_datetime: {
              [Op.between]: [start_date, end_date],
            },
          },
        });
        const incomes = await income.sum('nominal', {
          where: {
            user_id: user_id,
            income_datetime: {
              [Op.between]: [start_date, end_date],
            },
          },
        });
        return {
          status: 200,
          message: 'success',
          records: { expenseTotal: expenses, incomeTotal: incomes },
        };
      } else {
        const expenses = await expense.sum('nominal', {
          where: {
            user_id: user_id,
            expense_datetime: {
              [Op.between]: [firstDayOfMonth, lastDayOfMonth],
            },
          },
        });

        const incomes = await income.sum('nominal', {
          where: {
            user_id: user_id,
            income_datetime: {
              [Op.between]: [firstDayOfMonth, lastDayOfMonth],
            },
          },
        });
        return {
          status: 200,
          message: 'success',
          records: { expenseTotal: expenses || 0, incomeTotal: incomes || 0 },
        };
      }
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async filterPengeluaranByCategory(body: FilterPengeluaranByCategoryDto): Promise<any> {
    try {
      const { user_id, category_id, start_date, end_date } = body;

      if (!user_id || !category_id || !start_date || !end_date) {
        return {
          status: 200,
          message: 'Success',
          records: { expenseTotal: 0 },
        };
      }else if(user_id && category_id && start_date && end_date) {
        const expenses = await expense.sum('nominal', {
          where: {
            user_id: user_id,
            expense_datetime: {
              [Op.between]: [start_date, end_date],
            },
          },
        });

        return {
          status: 200,
          message: 'success',
          records: { expenseTotal: expenses || 0 },
        };
      }
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }
};
