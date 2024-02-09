import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  Body,
  Controller,
  Get,
  // Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUserDto } from './dto/get-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
async findAll(@Body() body: GetUserDto): Promise<any> {
  return this.usersService.findAll(body);
}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<any> {
    return this.usersService.create(body);
  }

  @Put()
  @UseInterceptors(FileInterceptor('image'))
  async updateProfile(
    @Body() body: UpdateProfileDto,
    @UploadedFile() file: Multer.File,
  ): Promise<any> {
    return this.usersService.updateProfile(body, file);
  }
  
  @Put('delete-image')
  async updateImage(
    @Body() userId: any
  ): Promise<any> {
    return this.usersService.deleteImage(userId);
  }
  
}
