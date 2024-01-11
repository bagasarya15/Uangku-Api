import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from '../../models';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    SequelizeModule.forFeature([users]),
    MulterModule.register({
      dest: './uploads', // Adjust the destination directory as needed
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
