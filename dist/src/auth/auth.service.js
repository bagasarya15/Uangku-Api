"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const sequelize_1 = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = require("../../models");
const common_1 = require("@nestjs/common");
let AuthService = class AuthService {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    async login(body) {
        try {
            const { usernameOrEmail, password } = body;
            const user = await models_1.users.findOne({
                where: {
                    [sequelize_1.Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
                },
            });
            if (!user) {
                throw new common_1.HttpException({
                    status: 400,
                    message: 'username atau password salah',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new common_1.HttpException({
                    status: 400,
                    message: 'username atau password salah',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (user.is_active == 0) {
                throw new common_1.HttpException({
                    status: 400,
                    message: 'akun anda belum melakukan aktivasi',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const usersToken = await models_1.users_token.findOne({
                where: {
                    user_id: user.id,
                },
            });
            const token = await this.generateToken(usernameOrEmail);
            let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(token), process.env.SECRET_KEY).toString();
            if (usersToken) {
                await models_1.users_token.update({
                    token: token,
                    secret_key: process.env.SECRET_KEY,
                }, {
                    where: {
                        user_id: user.id,
                    },
                });
            }
            else {
                await models_1.users_token.create({
                    user_id: user.id,
                    token: token,
                    secret_key: process.env.SECRET_KEY,
                });
            }
            return {
                status: 200,
                message: 'Login success',
                records: user,
                token: ciphertext,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async generateToken(usernameOrEmail) {
        let data = await models_1.users.findOne({
            attributes: ['id', 'username', 'name', 'email', 'image', 'is_active'],
            where: {
                [sequelize_1.Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
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
            expiresIn: '3h',
        });
        return token;
    }
    async isAuthorize(body) {
        try {
            const { secret_key } = body;
            const usersToken = await models_1.users_token.findOne({
                where: {
                    secret_key: secret_key,
                },
            });
            if (!usersToken) {
                throw new Error('Unauthorized');
            }
            return {
                status: 200,
                message: 'Success',
                records: usersToken,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async activatedAccount(body) {
        try {
            const { email, is_active } = body;
            const user = await models_1.users.findOne({
                where: { email: email },
            });
            if (!user) {
                return {
                    status: 404,
                    message: 'user tidak ditemukan',
                };
            }
            const update = await models_1.users.update({
                is_active: is_active,
            }, { where: { email: email }, returning: true });
            return {
                status: 200,
                message: 'aktivasi akun berhasil',
                records: update,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async changePassword(body) {
        try {
            const { user_id, oldPassword, newPassword } = body;
            const user = await models_1.users.findOne({
                where: { id: user_id },
            });
            if (!user) {
                throw new Error('User not found');
            }
            const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isOldPasswordValid) {
                throw new Error('Old password is incorrect');
            }
            const salt = await bcrypt.genSalt(10);
            const passHash = await bcrypt.hash(newPassword, salt);
            const update = await models_1.users.update({
                password: passHash,
            }, { where: { id: user_id }, returning: true });
            return { status: 200, message: 'Password changed successfully' };
        }
        catch (error) {
            throw new Error(`Error changing password: ${error.message}`);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sequelize_typescript_1.Sequelize])
], AuthService);
//# sourceMappingURL=auth.service.js.map