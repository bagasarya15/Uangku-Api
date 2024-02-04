import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { category, roles, users } from '../../models';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    SequelizeModule.forFeature([users, roles, category]),
    MulterModule.register({
      dest: './uploads', // Adjust the destination directory as needed
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
