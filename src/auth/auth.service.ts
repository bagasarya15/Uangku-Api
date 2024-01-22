import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { LoginDto } from './dto/login.dto';
import { roles, users } from '../../models';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private sequelize: Sequelize) {}

  async login(body: LoginDto): Promise<any> {
    try {
      const { usernameOrEmail, password } = body;

      const user = await users.findOne({
        where: {
          [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        },
      });

      const data = await users.findOne({
        attributes: ['id', 'name', 'email', 'image', 'is_active'],
        where: {
          [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        },
        include: [
          {
            model: roles,
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!user) {
        return 'email or username not found';
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return 'wrong password';
      }

      const token = jwt.sign(
        {
          data,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: '30m',
        },
      );

      return {
        status: 200,
        message: 'Login success',
        records: user,
        token: token,
      };
    } catch (error) {
      return error.message;
    }
  }
}
