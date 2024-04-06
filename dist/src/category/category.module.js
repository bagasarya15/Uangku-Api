"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const models_1 = require("../../models");
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const sequelize_1 = require("@nestjs/sequelize");
const category_controller_1 = require("./category.controller");
let CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([models_1.users, models_1.expense, models_1.income]),
        ],
        controllers: [category_controller_1.CategoryController],
        providers: [category_service_1.CategoryService],
    })
], CategoryModule);
//# sourceMappingURL=category.module.js.map