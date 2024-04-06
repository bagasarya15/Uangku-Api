import { expense } from '../../models';
import { GetExpenseDto } from './dto/get-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
export declare class ExpenseService {
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
    update(body: UpdateExpenseDto): Promise<{
        status: number;
        message: string;
        data: [affectedCount: number, affectedRows: expense[]];
    }>;
    remove(id: string): Promise<{
        status: number;
        message: string;
    }>;
}
