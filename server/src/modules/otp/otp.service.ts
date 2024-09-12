import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { otpStatus, TimeUnitEnum } from 'src/constants';
import { DateUtil } from 'src/utils';
import { Repository } from 'typeorm';
import { Otp } from './otp.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp) private readonly otpRepo: Repository<Otp>,
  ) {}

  async findOtp(otp: string, email: string) {
    try {
      const hasEmail = await this.otpRepo.findOne({
        where: {
          otp,
          email,
        },
      });
      return hasEmail;
    } catch (error) {
      throw new Error(error);
    }
  }

  async checkExpiredOtp(otp: Otp) {
    try {
      let isExpired = false;
      const expiredDate = otp.expiredTime;
      const dateDiff = DateUtil.dateDiff(
        new Date(),
        expiredDate,
        TimeUnitEnum.minutes,
      );
      if (dateDiff.dateDiff < 0) {
        await this.otpRepo.update(otp.otpId, {
          ...otp,
          isExpired: true,
        });
        isExpired = true;
      }
      return isExpired;
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveOtp(otp: string, email: string, otpType: string) {
    try {
      const createdOtp = this.otpRepo.create({
        otp,
        email,
        type: otpType,
        expiredTime: new Date(Date.now() + 2 * 60 * 1000),
      });
      await this.otpRepo.save(createdOtp);
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyOtp(otp: string, email: string) {
    try {
      const otpData = await this.findOtp(otp, email);
      const isExpiredOtp = await this.checkExpiredOtp(otpData);
      if (isExpiredOtp) {
        return otpStatus[0];
      } else if (otpData) {
        await this.otpRepo.update(otpData.otpId, {
          ...otpData,
          isVerified: true,
        });
        return otpStatus[1];
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOtp(otp: string) {
    try {
      const otpInfo = await this.otpRepo.findOne({
        where: {
          otp,
        },
      });
      await this.otpRepo.remove(otpInfo);
    } catch (error) {
      throw new Error(error);
    }
  }
}
