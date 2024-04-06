import { Multer } from 'multer';
import { users } from '../../models';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersService {
    findAll(page: number, limit: number, search?: string): Promise<{
        status: number;
        message: string;
        records: any;
        meta: {
            total: number;
            totalPages: number;
            totalCurrentPages: any;
            currentPage: number;
        };
    }>;
    create(body: CreateUserDto): Promise<{
        status: number;
        message: string;
        result: users;
    }>;
    updateProfile(body: UpdateProfileDto, file: Multer.File): Promise<any>;
    deleteImage(body: {
        userId: string;
    }): Promise<any>;
    generateToken(username: string): Promise<any>;
}
