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
exports.CreateExpenseDto = void 0;
const class_validator_1 = require("class-validator");
class CreateExpenseDto {
}
exports.CreateExpenseDto = CreateExpenseDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'UserId expense is required' }),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'CategoryId expense is required' }),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "category_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name expense is required' }),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nominal is required' }),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "nominal", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Expense date is required' }),
    __metadata("design:type", Date)
], CreateExpenseDto.prototype, "expense_datetime", void 0);
//# sourceMappingURL=create-expense.dto.js.map