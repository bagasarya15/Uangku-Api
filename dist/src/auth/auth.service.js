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
const common_1 = require("@nestjs/common");
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = require("../../models");
const sequelize_1 = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
                    message: 'wrong username or password',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new common_1.HttpException({
                    status: 400,
                    message: 'wrong username or password',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const token = await this.generateToken(usernameOrEmail);
            return {
                status: 200,
                message: 'Login success',
                records: user,
                token: token,
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sequelize_typescript_1.Sequelize])
], AuthService);
//# sourceMappingURL=auth.service.js.map