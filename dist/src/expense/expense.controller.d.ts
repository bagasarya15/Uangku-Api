import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { GetExpenseDto } from './dto/get-expense.dto';
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    create(body: CreateExpenseDto): Promise<{
        status: number;
        message: string;
        data: import("../../models").expenseAttributes;
    }>;
    findAll(body: GetExpenseDto): Promise<{
        status: number;
        message: string;
        records: any;
        meta: {
            total: number;
            totalPages: number;
            totalCurrentPages: any;
            currentPage: number;
        };
    }>;
    update(updateExpenseDto: UpdateExpenseDto): Promise<{
        status: number;
        message: string;
        data: [affectedCount: number, affectedRows: import("../../models").expense[]];
    }>;
    remove(id: string): Promise<{
        status: number;
        message: string;
    }>;
}
