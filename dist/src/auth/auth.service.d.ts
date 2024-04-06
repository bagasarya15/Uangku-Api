import { Sequelize } from 'sequelize-typescript';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private sequelize;
    constructor(sequelize: Sequelize);
    login(body: LoginDto): Promise<any>;
    generateToken(usernameOrEmail: string): Promise<any>;
}
