import { Model } from 'sequelize-typescript';
export interface sequelizemetaAttributes {
    name: string;
}
export declare class sequelizemeta extends Model<sequelizemetaAttributes, sequelizemetaAttributes> implements sequelizemetaAttributes {
    name: string;
}
