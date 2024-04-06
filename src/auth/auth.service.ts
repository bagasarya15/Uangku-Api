import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

      if (!user) {
        throw new HttpException(
          {
            status: 400,
            message: 'wrong username or password',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new HttpException(
          {
            status: 400,
            message: 'wrong username or password',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const token = await this.generateToken(usernameOrEmail);

      return {
        status: 200,
        message: 'Login success',
        records: user,
        token: token,
      };
    } catch (error) {
      throw error;
    }
  }

  async generateToken(usernameOrEmail: string): Promise<any> {
    let data = await users.findOne({
      attributes: ['id', 'username', 'name', 'email', 'image', 'is_active'],
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

    const token = jwt.sign(
      {
        data,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '3h',
      },
    );

    return token;
  }
}
