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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const models_1 = require("../../models");
const sequelize_1 = require("sequelize");
const date_fns_1 = require("date-fns");
let DashboardService = class DashboardService {
    constructor() { }
    async indexDashboard(body) {
        try {
            const { user_id, start_date, end_date } = body;
            const today = new Date();
            const firstDayOfMonth = (0, date_fns_1.startOfMonth)(today);
            const lastDayOfMonth = (0, date_fns_1.endOfMonth)(today);
            if (user_id && start_date && end_date) {
                const expenses = await models_1.expense.sum('nominal', {
                    where: {
                        user_id: user_id,
                        expense_datetime: {
                            [sequelize_1.Op.between]: [start_date, end_date],
                        },
                    },
                });
                const incomes = await models_1.income.sum('nominal', {
                    where: {
                        user_id: user_id,
                        income_datetime: {
                            [sequelize_1.Op.between]: [start_date, end_date],
                        },
                    },
                });
                return {
                    status: 200,
                    message: 'success',
                    records: { expenseTotal: expenses, incomeTotal: incomes },
                };
            }
            else {
                const expenses = await models_1.expense.sum('nominal', {
                    where: {
                        user_id: user_id,
                        expense_datetime: {
                            [sequelize_1.Op.between]: [firstDayOfMonth, lastDayOfMonth],
                        },
                    },
                });
                const incomes = await models_1.income.sum('nominal', {
                    where: {
                        user_id: user_id,
                        income_datetime: {
                            [sequelize_1.Op.between]: [firstDayOfMonth, lastDayOfMonth],
                        },
                    },
                });
                return {
                    status: 200,
                    message: 'success',
                    records: { expenseTotal: expenses || 0, incomeTotal: incomes || 0 },
                };
            }
        }
        catch (error) {
            return { status: 400, message: error.message };
        }
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DashboardService);
``;
//# sourceMappingURL=dashboard.service.js.map