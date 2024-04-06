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
exports.expense = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const category_1 = require("./category");
let expense = class expense extends sequelize_typescript_1.Model {
};
exports.expense = expense;
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    (0, sequelize_typescript_1.Index)({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true }),
    __metadata("design:type", String)
], expense.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], expense.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], expense.prototype, "nominal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    (0, sequelize_typescript_1.Index)({ name: 'user_id', using: 'BTREE', order: 'ASC', unique: false }),
    __metadata("design:type", String)
], expense.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => category_1.category),
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    (0, sequelize_typescript_1.Index)({ name: 'category_id', using: 'BTREE', order: 'ASC', unique: false }),
    __metadata("design:type", String)
], expense.prototype, "category_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DATE, defaultValue: sequelize_typescript_1.DataType.NOW }),
    __metadata("design:type", Date)
], expense.prototype, "expense_datetime", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, defaultValue: sequelize_typescript_1.DataType.NOW }),
    __metadata("design:type", Date)
], expense.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_1.category),
    __metadata("design:type", category_1.category)
], expense.prototype, "category", void 0);
exports.expense = expense = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'expense', timestamps: false })
], expense);
//# sourceMappingURL=expense.js.map