import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async register(body: RegisterDto) {
    const { email, password, name } = body;
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });
    if (user) {
      throw new BadRequestException('User already exists!');
    }
    const newUser = this.userRepo.create({
      email,
      password,
      name,
    });
    return await this.userRepo.save(newUser);
  }

  async login(body: LoginDto) {
    try {
      const { email, password } = body;
      const user = await this.userRepo.findOne({
        where: {
          email,
          password,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
