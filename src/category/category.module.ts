import { users } from '../../models';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryController } from './category.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([users]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
