import { Model } from 'sequelize-typescript';
export interface users_tokenAttributes {
    id?: number;
    user_id: string;
    token: string;
    secret_key: string;
}
export declare class users_token extends Model<users_tokenAttributes, users_tokenAttributes> implements users_tokenAttributes {
    id?: number;
    user_id: string;
    token: string;
    secret_key: string;
}
