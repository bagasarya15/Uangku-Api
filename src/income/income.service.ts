import { Op, Sequelize } from 'sequelize';
import { category, income } from '../../models';
import { GetIncomeDto } from './dto/get-income.dto';
import { uuidV4 } from '../../src/helpers/uuid-helper';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { responsePaginate } from '../helpers/response-paginate';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class IncomeService {
  async create(body: CreateIncomeDto) {
    try {
      const { user_id, category_id, name, nominal, income_datetime } = body;
      const resource = await income.create({
        id: uuidV4(),
        user_id: user_id,
        category_id: category_id,
        name: name,
        nominal: nominal,
        income_datetime: income_datetime,
      });
      return { status: 201, message: 'Success', data: resource.toJSON() };
    } catch (error) {
      throw error;
    }
  }

  async findAll(body: GetIncomeDto) {
    try {
      const { page, limit, search, user_id } = body;
      const offset = (page - 1) * limit;
      let whereClause: any = { user_id };
      let orderClause: any = [['income_datetime', 'DESC']];

      if (search) {
        whereClause = {
          ...whereClause,
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            Sequelize.literal(
              `(SELECT category_name FROM category WHERE category.id = income.category_id) LIKE '%${search}%'`,
            ),
          ],
        };
      }

      const collection = await income.findAll({
        where: whereClause,
        limit,
        offset,
        order: orderClause,
        include: [
          {
            model: category,
            as: 'category',
            attributes: ['category_name'],
          },
        ],
      });

      const totalCount = await income.count({ where: whereClause });

      return responsePaginate(collection, totalCount, page, limit);
    } catch (error) {
      throw error;
    }
  }
  async update(body: UpdateIncomeDto) {
    try {
      const { id, user_id, category_id, name, nominal, income_datetime } = body;
      const resource = await income.update(
        {
          user_id,
          category_id,
          name,
          nominal,
          income_datetime,
        },
        {
          where: { id },
          returning: true,
        },
      );
      return {
        status: 200,
        message: 'Update income successfully',
        data: resource,
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const resource = await income.destroy({
        where: { id },
      });
      if (resource === 0) {
        throw new HttpException(
          {
            status: 404,
            message: 'Expense not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return { status: 200, message: 'Delete income successfully' };
    } catch (error) {
      throw error;
    }
  }
}
