import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { category } from '../../models';
export declare class CategoryService {
    selectCategory(params: string, userId: string): Promise<{
        status: number;
        message: string;
        records?: undefined;
        error?: undefined;
    } | {
        status: number;
        message: string;
        records: category[];
        error?: undefined;
    } | {
        status: number;
        message: string;
        error: any;
        records?: undefined;
    }>;
    create(body: CreateCategoryDto): Promise<{
        status: number;
        message: string;
        result: category;
    }>;
    findAll(body: {
        page: number;
        limit: number;
        search: string;
        user_id: string;
    }): Promise<{
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
    update(body: UpdateCategoryDto): Promise<{
        status: number;
        message: string;
        result: [affectedCount: number, affectedRows: category[]];
    }>;
    remove(id: string): Promise<{
        status: number;
        message: string;
    }>;
}
