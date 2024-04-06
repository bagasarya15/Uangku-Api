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
exports.category = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_1 = require("./users");
const expense_1 = require("./expense");
const income_1 = require("./income");
let category = class category extends sequelize_typescript_1.Model {
};
exports.category = category;
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    (0, sequelize_typescript_1.Index)({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true }),
    __metadata("design:type", String)
], category.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    __metadata("design:type", String)
], category.prototype, "category_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    __metadata("design:type", String)
], category.prototype, "category_type", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_1.users),
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    (0, sequelize_typescript_1.Index)({ name: 'user_id', using: 'BTREE', order: 'ASC', unique: false }),
    __metadata("design:type", String)
], category.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, defaultValue: sequelize_typescript_1.DataType.NOW }),
    __metadata("design:type", Date)
], category.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_1.users),
    __metadata("design:type", users_1.users)
], category.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => expense_1.expense, { sourceKey: 'id' }),
    __metadata("design:type", Array)
], category.prototype, "expenses", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => income_1.income, { sourceKey: 'id' }),
    __metadata("design:type", Array)
], category.prototype, "incomes", void 0);
exports.category = category = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'category', timestamps: false })
], category);
//# sourceMappingURL=category.js.map