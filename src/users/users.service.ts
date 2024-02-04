import { DateTime } from 'luxon';
import { Multer } from 'multer';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { roles, users } from '../../models';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CreateUserDto } from './dto/create-user.dto';
import { cloudinaryConfig } from '../helpers/cloudinary';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  async findAll() {
    try {
      const data = await users.findAll({
        include: [
          {
            model: roles,
            attributes: ['id', 'name'],
          },
        ],
      });

      const response = {
        status: 200,
        message: 'success',
        result: data,
      };

      return response;
    } catch (error) {
      return error;
    }
  }

  async create(body: CreateUserDto) {
    try {
      const myUUID = uuidv4();
      const salt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(body.password, salt);

      const checkUser = await users.findOne({
        where: { username: body.username },
      });

      if (checkUser) {
        throw new HttpException({
          status: 422,
          message: 'Users already exist',
        }, HttpStatus.UNPROCESSABLE_ENTITY);
      } else {
        const currentTimeUTC = DateTime.utc();
        const currentTimeID = currentTimeUTC.setZone('Asia/Jakarta');

        const role_id = await roles.findOne({
          where: {name : 'users'}
        });

        const data = await users.create({
          id: myUUID,
          username: body.username,
          password: passHash,
          name: body.name,
          image: 'default.png',
          role_id: role_id.id,
          is_active: 1,
          created_at: currentTimeID.toJSDate(),
        });

        const response = {
          status: 201,
          message: 'Create users successfully',
          result: data,
        };

        return response;
      }
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

      return {
        status: 200,
        message: 'Profile updated successfully',
        result: userToUpdate,
      };
    } catch (error: any) {
      throw error;
    }
  }
}
