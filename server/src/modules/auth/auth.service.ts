import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenerateDataUtil, TransformDataUtil } from 'src/utils';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { UserDto } from '../user/dto/user.dto';
import { User } from '../user/user.entity';
import { OtpService } from './../otp/otp.service';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
  ) {}

  async sendMailRegister(email: string, otpType: string) {
    try {
      const otp = GenerateDataUtil.generateOtp();
      const reqBody = {
        email: email,
        otp,
      };
      await this.mailService.sendEmailRegisterConfirmation(reqBody);
      await this.otpService.saveOtp(otp, email, otpType);
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyRegisterOtp(body: VerifyOtpDto) {
    try {
      const { otp, email } = body;
      const response = await this.otpService.findOtp(otp, email);
      if (response) {
        await this.otpService.verifyOtp(otp, email);
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async register(body: RegisterDto) {
    try {
      const createdAccount = this.userRepo.create(body);
      const response = await this.userRepo.save(createdAccount);
      await this.otpService.deleteOtp(body.otp);
      return TransformDataUtil.serialize(UserDto, response);
    } catch (error) {
      throw new Error(error);
    }
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

  async changeForgetPassword(body: ForgetPasswordDto) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          email: body.email,
        },
      });
      await this.userRepo.update(user.userId, {
        password: body.password,
      });
      await this.otpService.deleteOtp(body.otp);
    } catch (error) {
      throw new Error(error);
    }
  }
}
