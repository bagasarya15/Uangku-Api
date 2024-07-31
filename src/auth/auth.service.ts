import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as CryptoJS from 'crypto-js';
import { LoginDto } from './dto/login.dto';
import { Sequelize } from 'sequelize-typescript';
import { roles, users, users_token } from '../../models';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

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
            message: 'username atau password salah',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new HttpException(
          {
            status: 400,
            message: 'username atau password salah',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (user.is_active == 0) {
        throw new HttpException(
          {
            status: 400,
            message: 'akun anda belum melakukan aktivasi',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const usersToken = await users_token.findOne({
        where: {
          user_id: user.id,
        },
      });

      const token = await this.generateToken(usernameOrEmail);

      let ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(token),
        process.env.SECRET_KEY,
      ).toString();

      if (usersToken) {
        await users_token.update(
          {
            token: token,
            secret_key: process.env.SECRET_KEY,
          },
          {
            where: {
              user_id: user.id,
            },
          },
        );
      } else {
        await users_token.create({
          user_id: user.id,
          token: token,
          secret_key: process.env.SECRET_KEY,
        });
      }

      return {
        status: 200,
        message: 'Login success',
        records: user,
        token: ciphertext,
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

  async isAuthorize(body: any) {
    try {
      const { secret_key } = body;
      const usersToken = await users_token.findOne({
        where: {
          secret_key: secret_key,
        },
      });
      if (!usersToken) {
        throw new Error('Unauthorized');
      }
      return {
        status: 200,
        message: 'Success',
        records: usersToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async activatedAccount(body: any): Promise<any> {
    try {
      const { email, is_active } = body;
      const user = await users.findOne({
        where: { email: email },
      });

      if (!user) {
        return {
          status: 404,
          message: 'user tidak ditemukan',
        };
      }

      const update = await users.update(
        {
          is_active: is_active,
        },
        { where: { email: email }, returning: true },
      );

      return {
        status: 200,
        message: 'aktivasi akun berhasil',
        records: update,
      };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(body: any): Promise<any> {
    try {
      const { user_id, oldPassword, newPassword } = body;
      const user = await users.findOne({
        where: { id: user_id },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const isOldPasswordValid = await bcrypt.compare(
        oldPassword,
        user.password,
      );
      if (!isOldPasswordValid) {
        throw new Error('Old password is incorrect');
      }

      const salt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(newPassword, salt);

      const update = await users.update(
        {
          password: passHash,
        },
        { where: { id: user_id }, returning: true },
      );

      return { status: 200, message: 'Password changed successfully' };
    } catch (error) {
      throw new Error(`Error changing password: ${error.message}`);
    }
  }
}
