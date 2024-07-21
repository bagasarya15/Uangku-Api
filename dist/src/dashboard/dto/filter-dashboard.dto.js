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
exports.FilterPengeluaranByCategoryDto = exports.FilterDashboardDto = void 0;
const class_validator_1 = require("class-validator");
class FilterDashboardDto {
}
exports.FilterDashboardDto = FilterDashboardDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterDashboardDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterDashboardDto.prototype, "start_date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterDashboardDto.prototype, "end_date", void 0);
class FilterPengeluaranByCategoryDto {
}
exports.FilterPengeluaranByCategoryDto = FilterPengeluaranByCategoryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPengeluaranByCategoryDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPengeluaranByCategoryDto.prototype, "category_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterPengeluaranByCategoryDto.prototype, "start_date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterPengeluaranByCategoryDto.prototype, "end_date", void 0);
//# sourceMappingURL=filter-dashboard.dto.js.map