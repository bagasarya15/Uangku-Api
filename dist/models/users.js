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
exports.users = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const roles_1 = require("./roles");
const category_1 = require("./category");
let users = class users extends sequelize_typescript_1.Model {
};
exports.users = users;
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    (0, sequelize_typescript_1.Index)({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true }),
    __metadata("design:type", String)
], users.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    (0, sequelize_typescript_1.Index)({ name: 'username', using: 'BTREE', order: 'ASC', unique: true }),
    __metadata("design:type", String)
], users.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    __metadata("design:type", String)
], users.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => roles_1.roles),
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    (0, sequelize_typescript_1.Index)({ name: 'role_id', using: 'BTREE', order: 'ASC', unique: false }),
    __metadata("design:type", String)
], users.prototype, "role_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    __metadata("design:type", String)
], users.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255) }),
    __metadata("design:type", String)
], users.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    __metadata("design:type", String)
], users.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.TINYINT }),
    __metadata("design:type", Number)
], users.prototype, "is_active", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], users.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], users.prototype, "update_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => roles_1.roles),
    __metadata("design:type", roles_1.roles)
], users.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => category_1.category, { sourceKey: 'id' }),
    __metadata("design:type", Array)
], users.prototype, "categories", void 0);
exports.users = users = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'users', timestamps: false })
], users);
//# sourceMappingURL=users.js.map