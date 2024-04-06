import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { GetIncomeDto } from './dto/get-income.dto';
export declare class IncomeController {
    private readonly incomeService;
    constructor(incomeService: IncomeService);
    create(body: CreateIncomeDto): Promise<{
        status: number;
        message: string;
        data: import("../../models").incomeAttributes;
    }>;
    findAll(body: GetIncomeDto): Promise<{
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
    update(body: UpdateIncomeDto): Promise<{
        status: number;
        message: string;
        data: [affectedCount: number, affectedRows: import("../../models").income[]];
    }>;
    remove(id: string): Promise<{
        status: number;
        message: string;
    }>;
}
