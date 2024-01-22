import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { roles, users } from '../../models';

@Module({
  imports: [SequelizeModule.forFeature([users, roles])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
