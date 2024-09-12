import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUserDto } from 'src/dto';
import { GenerateDataUtil, TransformDataUtil } from 'src/utils';
import { Like, Repository } from 'typeorm';
import { CloudinaryResponse } from '../cloudinary/dto/cloudinary.type';
import { GetUserListQueryDto } from './dto/get-user-list-query.dto';
import { UpdateInformationDto } from './dto/update-infomation.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findUser(userId: string) {
    try {
      const response = await this.userRepo.findOne({
        where: {
          userId,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProfile(userId: string) {
    try {
      const response = await this.findUser(userId);
      return TransformDataUtil.serialize(UserDto, response);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateAvatar(
    userId: string,
    uploadedFile?: CloudinaryResponse,
    isRemove?: string,
  ) {
    try {
      await this.userRepo.update(userId, {
        avatar: isRemove ? null : uploadedFile.url,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async changePassword(userId: string, newPassword: string) {
    try {
      await this.userRepo.update(userId, {
        password: newPassword,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateInformation(user: CurrentUserDto, body: UpdateInformationDto) {
    try {
      const { email, name, phoneNumber, address } = body;
      await this.userRepo.update(user.userId, {
        email: email ?? user.email,
        name: name ?? user.name,
        phoneNumber: phoneNumber ?? user.phoneNumber,
        address: address ?? user.address,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserList(query: GetUserListQueryDto) {
    try {
      const { size, skip, sortKey, sortValue } =
        GenerateDataUtil.paginationFields(query);

      const whereCondition = query.search
        ? [
            {
              name: Like(`%${query.search}%`),
            },
            {
              email: Like(`%${query.search}%`),
            },
          ]
        : GenerateDataUtil.findOnReqQuery({
            name: query.name,
            email: query.email,
            phoneNumber: query.phoneNumber,
            address: query.address,
            role: query.role,
          });

      const [userList, totalData] = await this.userRepo.findAndCount({
        where: whereCondition,
        order: {
          [sortKey]: sortValue,
        },
        take: size,
        skip,
      });
      const totalPage = Math.ceil(totalData / size);
      const data = userList.map((item) => {
        return TransformDataUtil.serialize(UserDto, item);
      });

      return {
        data,
        paginator: {
          page: Number(query.page) || 1,
          size,
          totalPage: totalPage || 1,
          totalData,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserDetail(userId: string) {
    try {
      const response = await this.userRepo.findOne({
        where: {
          userId,
        },
      });
      return TransformDataUtil.serialize(UserDto, response);
    } catch (error) {
      throw new Error(error);
    }
  }

  async changeUserRole(user: User) {
    try {
      await this.userRepo.update(user.userId, {
        role: user.role === 1 ? 2 : 1,
      });
      return user.role === 1 ? 2 : 1;
    } catch (error) {
      throw new Error(error);
    }
  }
}
