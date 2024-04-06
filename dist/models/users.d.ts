import { Model } from 'sequelize-typescript';
import { roles } from './roles';
import { category } from './category';
export interface usersAttributes {
    id: string;
    username?: string;
    password?: string;
    role_id?: string;
    email?: string;
    name: string;
    image?: string;
    is_active?: number;
    created_at?: Date;
    update_at?: Date;
}
export declare class users extends Model<usersAttributes, usersAttributes> implements usersAttributes {
    id: string;
    username?: string;
    password?: string;
    role_id?: string;
    email?: string;
    name: string;
    image?: string;
    is_active?: number;
    created_at?: Date;
    update_at?: Date;
    role?: roles;
    categories?: category[];
}
