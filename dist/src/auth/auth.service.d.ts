import { LoginDto } from './dto/login.dto';
import { Sequelize } from 'sequelize-typescript';
import { users_token } from '../../models';
export declare class AuthService {
    private sequelize;
    constructor(sequelize: Sequelize);
    login(body: LoginDto): Promise<any>;
    generateToken(usernameOrEmail: string): Promise<any>;
    isAuthorize(body: any): Promise<{
        status: number;
        message: string;
        records: users_token;
    }>;
    activatedAccount(body: any): Promise<any>;
}
