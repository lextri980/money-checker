import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from '../otp/otp.entity';
import { User } from '../user/user.entity';
import { EmailRegisterDto } from './dto/email-register.dto';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Otp) private readonly otpRepo: Repository<Otp>,
    private readonly mailerService: MailerService,
  ) {}

  async checkExistedMail(email: string) {
    try {
      const sentMailOtp = await this.otpRepo.findOne({
        where: {
          email,
        },
      });
      if (sentMailOtp) {
        await this.otpRepo.remove(sentMailOtp);
      }
      const response = await this.userRepo.findOne({
        where: {
          email,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendEmailRegisterConfirmation(emailRegisterDto: EmailRegisterDto) {
    try {
      await this.mailerService.sendMail({
        to: emailRegisterDto.email,
        subject: 'Confirm email',
        template: './mail-confirm-register',
        context: {
          email: emailRegisterDto.email,
          otp: emailRegisterDto.otp,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
