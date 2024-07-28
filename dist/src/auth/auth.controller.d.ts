import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(body: LoginDto): Promise<any>;
    isAuthorize(body: any): Promise<any>;
    activatedAccount(body: any): Promise<any>;
}
