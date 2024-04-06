import { Model } from 'sequelize-typescript';
import { category } from './category';
export interface expenseAttributes {
    id: string;
    name?: string;
    nominal: string;
    user_id?: string;
    category_id?: string;
    expense_datetime?: Date;
    created_at?: Date;
}
export declare class expense extends Model<expenseAttributes, expenseAttributes> implements expenseAttributes {
    id: string;
    name?: string;
    nominal: string;
    user_id?: string;
    category_id?: string;
    expense_datetime?: Date;
    created_at?: Date;
    category?: category;
}
