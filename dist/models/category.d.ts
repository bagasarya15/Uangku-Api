import { Model } from 'sequelize-typescript';
import { users } from './users';
import { expense } from './expense';
import { income } from './income';
export interface categoryAttributes {
    id: string;
    category_name?: string;
    category_type?: string;
    user_id?: string;
    created_at?: Date;
}
export declare class category extends Model<categoryAttributes, categoryAttributes> implements categoryAttributes {
    id: string;
    category_name?: string;
    category_type?: string;
    user_id?: string;
    created_at?: Date;
    user?: users;
    expenses?: expense[];
    incomes?: income[];
}
