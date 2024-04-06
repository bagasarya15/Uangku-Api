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
exports.roles = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_1 = require("./users");
let roles = class roles extends sequelize_typescript_1.Model {
};
exports.roles = roles;
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    (0, sequelize_typescript_1.Index)({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true }),
    __metadata("design:type", String)
], roles.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    __metadata("design:type", String)
], roles.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, defaultValue: sequelize_typescript_1.DataType.NOW }),
    __metadata("design:type", Date)
], roles.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], roles.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => users_1.users, { sourceKey: 'id' }),
    __metadata("design:type", Array)
], roles.prototype, "users", void 0);
exports.roles = roles = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'roles', timestamps: false })
], roles);
//# sourceMappingURL=roles.js.map