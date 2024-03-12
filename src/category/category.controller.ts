import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('select-option/:params/:userId')
  async selectCategory(
    @Param('params') params: string,
    @Param('userId') userId: string,
  ) {
    return this.categoryService.selectCategory(params, userId);
  }

  @Post()
  create(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }

  @Post('get-category')
  findAll(
    @Body()
    body: {
      page: number;
      limit: number;
      search: string;
      user_id: string;
    },
  ) {
    console.log(body, 'INI CEK PAGE LIMIT');
    return this.categoryService.findAll(body);
  }

  @Put('update')
  update(@Body() body: UpdateCategoryDto) {
    return this.categoryService.update(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
