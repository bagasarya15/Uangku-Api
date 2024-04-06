import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Multer } from 'multer';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(page: string, limit: string, search?: string): Promise<any>;
    create(body: CreateUserDto): Promise<any>;
    updateProfile(body: UpdateProfileDto, file: Multer.File): Promise<any>;
    updateImage(userId: any): Promise<any>;
}
