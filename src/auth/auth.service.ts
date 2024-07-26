import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { LoginDto } from './dto/login.dto';
import { roles, users, users_token } from '../../models';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

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

      const usersToken = await users_token.findOne({
        where : {
          user_id : user.id
        }
      });

      const token = await this.generateToken(usernameOrEmail);
      const secretKey = crypto.randomBytes(300).toString('hex');

      if(usersToken){
        await users_token.update({
          token : token,
          secret_key : secretKey
        }, {
          where: {
            user_id: user.id,
          },
        });
      }else{
        await users_token.create({
          user_id : user.id,
          token: token,
          secret_key : secretKey
        })
      }

      return {
        status: 200,
        message: 'Login success',
        records: user,
        token: secretKey,
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
          secret_key: secret_key
        }
      });
      if (!usersToken) {
        throw new Error('Unauthorized');
      }
      return {
        status : 200,
        message : 'Success',
        records : usersToken
      }; 
    } catch (error) {
      throw error;
    }
  }
  
}
