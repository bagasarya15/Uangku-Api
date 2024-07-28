"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeService = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../models");
const uuid_helper_1 = require("../../src/helpers/uuid-helper");
const response_paginate_1 = require("../helpers/response-paginate");
const common_1 = require("@nestjs/common");
let IncomeService = class IncomeService {
    async create(body) {
        try {
            const { user_id, category_id, name, nominal, income_datetime } = body;
            const resource = await models_1.income.create({
                id: (0, uuid_helper_1.uuidV4)(),
                user_id: user_id,
                category_id: category_id,
                name: name,
                nominal: nominal,
                income_datetime: income_datetime,
            });
            return { status: 201, message: 'Success', data: resource.toJSON() };
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(body) {
        try {
            const { page, limit, search, user_id } = body;
            const offset = (page - 1) * limit;
            let whereClause = { user_id };
            let orderClause = [['income_datetime', 'DESC']];
            if (search) {
                whereClause = {
                    ...whereClause,
                    [sequelize_1.Op.or]: [
                        { name: { [sequelize_1.Op.like]: `%${search}%` } },
                        sequelize_1.Sequelize.literal(`(SELECT category_name FROM category WHERE category.id = income.category_id) LIKE '%${search}%'`),
                    ],
                };
            }
            const collection = await models_1.income.findAll({
                where: whereClause,
                limit,
                offset,
                order: orderClause,
                include: [
                    {
                        model: models_1.category,
                        as: 'category',
                        attributes: ['category_name'],
                    },
                ],
            });
            const totalCount = await models_1.income.count({ where: whereClause });
            return (0, response_paginate_1.responsePaginate)(collection, totalCount, page, limit);
        }
        catch (error) {
            throw error;
        }
    }
    async update(body) {
        try {
            const { id, user_id, category_id, name, nominal, income_datetime } = body;
            const resource = await models_1.income.update({
                user_id,
                category_id,
                name,
                nominal,
                income_datetime,
            }, {
                where: { id },
                returning: true,
            });
            return {
                status: 200,
                message: 'Update income successfully',
                data: resource,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const resource = await models_1.income.destroy({
                where: { id },
            });
            if (resource === 0) {
                throw new common_1.HttpException({
                    status: 404,
                    message: 'Expense not found',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return { status: 200, message: 'Delete income successfully' };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.IncomeService = IncomeService;
exports.IncomeService = IncomeService = __decorate([
    (0, common_1.Injectable)()
], IncomeService);
//# sourceMappingURL=income.service.js.map