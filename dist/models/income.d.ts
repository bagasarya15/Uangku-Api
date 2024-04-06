import { Model } from 'sequelize-typescript';
import { category } from './category';
export interface incomeAttributes {
    id: string;
    name?: string;
    nominal: string;
    user_id?: string;
    category_id?: string;
    income_datetime?: Date;
    created_at?: Date;
}
export declare class income extends Model<incomeAttributes, incomeAttributes> implements incomeAttributes {
    id: string;
    name?: string;
    nominal: string;
    user_id?: string;
    category_id?: string;
    income_datetime?: Date;
    created_at?: Date;
    category?: category;
}
