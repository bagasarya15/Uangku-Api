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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeController = void 0;
const common_1 = require("@nestjs/common");
const income_service_1 = require("./income.service");
const create_income_dto_1 = require("./dto/create-income.dto");
const update_income_dto_1 = require("./dto/update-income.dto");
const get_income_dto_1 = require("./dto/get-income.dto");
let IncomeController = class IncomeController {
    constructor(incomeService) {
        this.incomeService = incomeService;
    }
    create(body) {
        return this.incomeService.create(body);
    }
    findAll(body) {
        console.log(body, 'INI CEK PAGE LIMIT PEMASUKAN');
        return this.incomeService.findAll(body);
    }
    update(body) {
        return this.incomeService.update(body);
    }
    remove(id) {
        return this.incomeService.remove(id);
    }
};
exports.IncomeController = IncomeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_income_dto_1.CreateIncomeDto]),
    __metadata("design:returntype", void 0)
], IncomeController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('get-income'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_income_dto_1.GetIncomeDto]),
    __metadata("design:returntype", void 0)
], IncomeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_income_dto_1.UpdateIncomeDto]),
    __metadata("design:returntype", void 0)
], IncomeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IncomeController.prototype, "remove", null);
exports.IncomeController = IncomeController = __decorate([
    (0, common_1.Controller)('income'),
    __metadata("design:paramtypes", [income_service_1.IncomeService])
], IncomeController);
//# sourceMappingURL=income.controller.js.map