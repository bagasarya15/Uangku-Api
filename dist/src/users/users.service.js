"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const luxon_1 = require("luxon");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const models_1 = require("../../models");
const cloudinary_1 = require("cloudinary");
const cloudinary_2 = require("../helpers/cloudinary");
const response_paginate_1 = require("../helpers/response-paginate");
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const sequelize_1 = require("sequelize");
let UsersService = class UsersService {
    async findAll(page, limit, search) {
        try {
            let whereClause = {};
            if (search) {
                whereClause = {
                    [sequelize_1.Op.or]: [
                        { name: { [sequelize_1.Op.like]: `%${search}%` } },
                        { email: { [sequelize_1.Op.like]: `%${search}%` } },
                    ],
                };
            }
            const offset = (page - 1) * limit;
            const data = await models_1.users.findAll({
                where: whereClause,
                include: [
                    {
                        model: models_1.roles,
                        attributes: ['id', 'name'],
                    },
                ],
                limit: limit,
                offset: offset,
            });
            const totalCount = await models_1.users.count();
            return (0, response_paginate_1.responsePaginate)(data, totalCount, page, limit);
        }
        catch (error) {
            throw error;
        }
    }
    async create(body) {
        try {
            const myUUID = (0, uuid_1.v4)();
            const salt = await bcrypt.genSalt(10);
            const passHash = await bcrypt.hash(body.password, salt);
            const checkUsername = await models_1.users.findOne({
                where: { username: body.username },
            });
            if (checkUsername) {
                throw new common_1.HttpException({
                    status: 422,
                    message: 'Username tidak tersedia',
                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            const checkEmail = await models_1.users.findOne({
                where: { email: body.email },
            });
            if (checkEmail) {
                throw new common_1.HttpException({
                    status: 422,
                    message: 'Email tidak tersedia',
                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            const currentTimeUTC = luxon_1.DateTime.utc();
            const currentTimeID = currentTimeUTC.setZone('Asia/Jakarta');
            const role = await models_1.roles.findOne({
                where: { name: 'users' },
            });
            const data = await models_1.users.create({
                id: myUUID,
                username: body.username,
                password: passHash,
                name: body.name,
                image: 'default.jpg',
                email: body.email,
                role_id: role.id,
                is_active: 0,
                created_at: currentTimeID.toJSDate(),
            });
            return {
                status: 201,
                message: 'User created successfully',
                result: data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updateProfile(body, file) {
        try {
            (0, cloudinary_2.cloudinaryConfig)();
            const userToUpdate = await models_1.users.findByPk(body.id);
            if (!userToUpdate) {
                return {
                    status: 404,
                    message: 'User not found',
                };
            }
            if (body.username !== userToUpdate.username) {
                const existingUser = await models_1.users.findOne({
                    where: {
                        username: body.username,
                    },
                });
                if (existingUser) {
                    throw new common_1.HttpException({
                        status: 422,
                        message: 'Users already exist',
                    }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                }
            }
            if (body.email !== userToUpdate.email) {
                const checkEmail = await models_1.users.findOne({
                    where: {
                        username: body.username,
                    },
                });
                if (checkEmail) {
                    throw new common_1.HttpException({
                        status: 422,
                        message: 'Email already exist',
                    }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                }
            }
            userToUpdate.username = body.username;
            userToUpdate.name = body.name;
            userToUpdate.email = body.email;
            if (file) {
                const cloudinaryResponse = await cloudinary_1.v2.uploader.upload(file.path, {
                    public_id: body.id,
                    folder: 'users',
                    overwrite: true,
                });
                const imageUrl = cloudinaryResponse.secure_url;
                userToUpdate.image = imageUrl;
            }
            await userToUpdate.save();
            const token = await this.generateToken(userToUpdate.username);
            return {
                status: 200,
                message: 'Update profile successfully',
                result: userToUpdate,
                tokenUpdate: token,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteImage(body) {
        try {
            (0, cloudinary_2.cloudinaryConfig)();
            const userId = body.userId;
            const userToUpdate = await models_1.users.findByPk(userId);
            if (!userToUpdate) {
                return {
                    status: 404,
                    message: 'User not found',
                };
            }
            if (userToUpdate.image) {
                const publicId = userToUpdate.image.split('/').pop()?.split('.')[0];
                if (publicId) {
                    const folderPublicId = `users/${publicId}`;
                    await cloudinary_1.v2.uploader.destroy(folderPublicId);
                }
            }
            userToUpdate.image = 'default.jpg';
            await userToUpdate.save();
            const token = await this.generateToken(userToUpdate.username);
            return {
                status: 200,
                message: 'Image updated successfully',
                tokenUpdate: token,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async generateToken(username) {
        let data = await models_1.users.findOne({
            attributes: ['id', 'username', 'name', 'email', 'image', 'is_active'],
            where: {
                username: username,
            },
            include: [
                {
                    model: models_1.roles,
                    attributes: ['id', 'name'],
                },
            ],
        });
        const token = jwt.sign({
            data,
        }, process.env.SECRET_KEY, {
            expiresIn: '30m',
        });
        return token;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map