import { Model } from 'sequelize-typescript';
import { users } from './users';
export interface rolesAttributes {
    id: string;
    name?: string;
    created_at?: Date;
    updated_at?: Date;
}
export declare class roles extends Model<rolesAttributes, rolesAttributes> implements rolesAttributes {
    id: string;
    name?: string;
    created_at?: Date;
    updated_at?: Date;
    users?: users[];
}
