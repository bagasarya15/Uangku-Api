import { DateTime } from 'luxon';
import { Multer } from 'multer';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { roles, users } from '../../models';
import { v2 as cloudinary } from 'cloudinary';
import { CreateUserDto } from './dto/create-user.dto';
import { cloudinaryConfig } from '../helpers/cloudinary';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { responsePaginate } from '../helpers/response-paginate';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class UsersService {
  async findAll(page: number, limit: number, search?: string) {
    try {
      let whereClause = {};

      if (search) {
        whereClause = {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
          ],
        };
      }

      const offset = (page - 1) * limit;
      const data = await users.findAll({
        where: whereClause,
        include: [
          {
            model: roles,
            attributes: ['id', 'name'],
          },
        ],
        limit: limit,
        offset: offset,
      });

      const totalCount = await users.count();

      return responsePaginate(data, totalCount, page, limit);
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateUserDto) {
    try {
      const myUUID = uuidv4();
      const salt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(body.password, salt);
  
      // Check if username already exists
      const checkUsername = await users.findOne({
        where: { username: body.username },
      });
  
      if (checkUsername) {
        throw new HttpException(
          {
            status: 422,
            message: 'Username tidak tersedia',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
  
      // Check if email already exists
      const checkEmail = await users.findOne({
        where: { email: body.email },
      });
  
      if (checkEmail) {
        throw new HttpException(
          {
            status: 422,
            message: 'Email tidak tersedia',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
  
      const currentTimeUTC = DateTime.utc();
      const currentTimeID = currentTimeUTC.setZone('Asia/Jakarta');
  
      const role = await roles.findOne({
        where: { name: 'users' },
      });
  
      const data = await users.create({
        id: myUUID,
        username: body.username,
        password: passHash,
        name: body.name,
        image: 'default.jpg',
        email: body.email,
        role_id: role.id,
        is_active: 0,
        created_at: currentTimeID.toJSDate(),
      });
  
      return {
        status: 201,
        message: 'User created successfully',
        result: data,
      };
    } catch (error: any) {
      throw error;
    }
  }
  
  async updateProfile(body: UpdateProfileDto, file: Multer.File): Promise<any> {
    try {
      cloudinaryConfig();

      const userToUpdate = await users.findByPk(body.id);
      if (!userToUpdate) {
        return {
          status: 404,
          message: 'User not found',
        };
      }

      if (body.username !== userToUpdate.username) {
        const existingUser = await users.findOne({
          where: {
            username: body.username,
          },
        });

        if (existingUser) {
          throw new HttpException(
            {
              status: 422,
              message: 'Users already exist',
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      }

      if (body.email !== userToUpdate.email) {
        const checkEmail = await users.findOne({
          where: {
            username: body.username,
          },
        });

        if (checkEmail) {
          throw new HttpException(
            {
              status: 422,
              message: 'Email already exist',
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      }

      userToUpdate.username = body.username;
      userToUpdate.name = body.name;
      userToUpdate.email = body.email;

      if (file) {
        const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
          public_id: body.id,
          folder: 'users',
          overwrite: true,
        });
        const imageUrl = cloudinaryResponse.secure_url;

        userToUpdate.image = imageUrl;
      }

      await userToUpdate.save();

      const token = await this.generateToken(userToUpdate.username);

      return {
        status: 200,
        message: 'Update profile successfully',
        result: userToUpdate,
        tokenUpdate: token,
      };
    } catch (error: any) {
      throw error;
    }
  }

  async deleteImage(body: { userId: string }): Promise<any> {
    try {
      cloudinaryConfig();
      const userId = body.userId;
      const userToUpdate = await users.findByPk(userId);
      if (!userToUpdate) {
        return {
          status: 404,
          message: 'User not found',
        };
      }

      if (userToUpdate.image) {
        const publicId = userToUpdate.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          const folderPublicId = `users/${publicId}`;
          await cloudinary.uploader.destroy(folderPublicId);
        }
      }

      userToUpdate.image = 'default.jpg';
      await userToUpdate.save();
      const token = await this.generateToken(userToUpdate.username);
      return {
        status: 200,
        message: 'Image updated successfully',
        tokenUpdate: token,
      };
    } catch (error: any) {
      throw error;
    }
  }

  async generateToken(username: string): Promise<any> {
    let data = await users.findOne({
      attributes: ['id', 'username', 'name', 'email', 'image', 'is_active'],
      where: {
        username: username,
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
        expiresIn: '30m',
      },
    );

    return token;
  }
}
