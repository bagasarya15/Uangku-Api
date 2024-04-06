"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const models_1 = require("../../models");
const response_paginate_1 = require("../helpers/response-paginate");
const sequelize_1 = require("sequelize");
let CategoryService = class CategoryService {
    async selectCategory(params, userId) {
        try {
            const collection = await models_1.category.findAll({
                where: { category_type: params, user_id: userId },
            });
            if (!collection || collection.length === 0) {
                return { status: 404, message: 'Category not found' };
            }
            return { status: 200, message: 'Success', records: collection };
        }
        catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: error.message,
            };
        }
    }
    async create(body) {
        try {
            const myUUID = (0, uuid_1.v4)();
            const { category_name, category_type, user_id } = body;
            const existingCategory = await models_1.category.findOne({
                where: { category_name, user_id },
            });
            if (existingCategory) {
                throw new common_1.HttpException({
                    status: 400,
                    message: 'Category already exist',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const data = await models_1.category.create({
                id: myUUID,
                category_name: category_name,
                category_type: category_type,
                user_id: user_id,
            });
            return {
                status: 201,
                message: 'Create category successfully',
                result: data,
            };
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
            let orderClause = [['created_at', 'DESC']];
            if (search) {
                whereClause = {
                    ...whereClause,
                    [sequelize_1.Op.or]: [{ category_name: { [sequelize_1.Op.like]: `%${search}%` } }],
                };
            }
            const data = await models_1.category.findAll({
                where: whereClause,
                limit,
                offset,
                order: orderClause,
            });
            const totalCount = await models_1.category.count({ where: whereClause });
            return (0, response_paginate_1.responsePaginate)(data, totalCount, page, limit);
        }
        catch (error) {
            throw error;
        }
    }
    async update(body) {
        try {
            const { id, category_name, category_type, user_id } = body;
            const existingCategory = await models_1.category.findOne({
                where: { category_name, id: { [sequelize_1.Op.not]: id } },
            });
            if (existingCategory) {
                throw new common_1.HttpException({
                    status: 400,
                    message: 'Category name already exists for another category',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const updatedCategory = await models_1.category.update({
                category_name: category_name,
                category_type: category_type,
                user_id: user_id,
            }, { where: { id: id }, returning: true });
            return {
                status: 200,
                message: 'Category updated successfully',
                result: updatedCategory,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const deletedCategory = await models_1.category.destroy({ where: { id } });
            if (deletedCategory === 0) {
                throw new common_1.HttpException({
                    status: 404,
                    message: 'Category not found',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                status: 200,
                message: 'Category deleted successfully',
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)()
], CategoryService);
//# sourceMappingURL=category.service.js.map