import { Op } from 'sequelize';
import { uuidV4 } from '../helpers/uuid-helper';
import { category, expense } from '../../models';
import { GetExpenseDto } from './dto/get-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { responsePaginate } from '../helpers/response-paginate';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ExpenseService {
  async create(body: CreateExpenseDto) {
    try {
      const {user_id, category_id, name, nominal, expense_datetime} = body;
      const resource = await expense.create({
        id : uuidV4(),
        user_id : user_id,
        category_id : category_id,
        name: name,
        nominal: nominal,
        expense_datetime: expense_datetime
      });
      return {status: 201, message:"Success", data : resource.toJSON()}
    } catch (error) {
      throw error;
    }
  }

  async findAll(body: GetExpenseDto) {
    try {
      const { page, limit, search, user_id } = body;
      const offset = (page - 1) * limit;
      let whereClause: any = { user_id };
      let orderClause: any = [['created_at', 'DESC']]; 
  
      if (search) {
        whereClause = {
          ...whereClause,
          [Op.or]: [
            { category_name: { [Op.like]: `%${search}%` } },
          ],
        };
      }
  
      const collection = await expense.findAll({
        where: whereClause,
        limit,
        offset,
        order: orderClause,
        include: [
          { model: category, attributes: ['id', 'category_name', 'category_type'] }
        ]
      });
  
      const totalCount = await expense.count({ where: whereClause });
  
      return responsePaginate(collection, totalCount, page, limit);
    } catch (error) {
      throw error;
    }
  }

  async update(body: UpdateExpenseDto) {
    try {
      const {id, user_id, category_id, name, nominal, expense_datetime} = body;
      const resource = await expense.update(
        {
          user_id,
          category_id,
          name,
          nominal,
          expense_datetime
        },
        {
          where: { id },
          returning: true 
        }
      );
      return {status:200, message: 'Update expense successfully', records: resource}
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const resource = await expense.destroy({
        where: {id}
      });
      if(resource === 0){
        throw new HttpException({
          status: 404,
          message: 'Expense not found',
        }, HttpStatus.NOT_FOUND);
      }
      return {status:200, message:'Delete expense successfully'}
    } catch (error) {
      throw error;
    }
  }
}
