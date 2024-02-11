import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':page/:limit/:search?')
  async findAll(@Param('page') page: string, @Param('limit') limit: string, @Param('search') search?:string): Promise<any> {
    console.log(page, limit, "SET PAGE LIMIT");
    console.log(search, 'CONSOLE LOG SEARCH');
    return this.usersService.findAll(parseInt(page), parseInt(limit), search);
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
