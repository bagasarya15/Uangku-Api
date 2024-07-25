import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { roles, users, users_token } from '../../models';

@Module({
  imports: [SequelizeModule.forFeature([users, roles, users_token])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
