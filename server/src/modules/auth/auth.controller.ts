import { Body, Controller, Post, Put, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { OtpTypeEnum } from 'src/constants';
import { Swagger } from 'src/decorators';
import { ResponseUtil, TransformDataUtil } from 'src/utils';
import { OtpService } from '../otp/otp.service';
import { UserDto } from '../user/dto/user.dto';
import { MailService } from './../mail/mail.service';
import { AuthService } from './auth.service';
import { authSwagger } from './auth.swagger';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/send-mail-register')
  @Swagger(authSwagger.sendMailRegister)
  async sendMailRegister(
    @Res() res: Response,
    @Body() body: Partial<ForgetPasswordDto>,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const { email } = body;
      if (!email) {
        return ResponseUtil.badRequest(res, i18n.t('lg.emailRq'));
      }
      const isMailExisted = await this.mailService.checkExistedMail(email);
      if (isMailExisted) {
        return ResponseUtil.badRequest(res, i18n.t('lg.emailExt'));
      }
      await this.authService.sendMailRegister(email, OtpTypeEnum.register);
      return ResponseUtil.success(res, null, i18n.t('lg.sendOtpSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Post('/verify-register-otp')
  @Swagger(authSwagger.verifyRegisterOtp)
  async verifyRegisterOtp(
    @Res() res: Response,
    @Body() body: VerifyOtpDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      await this.authService.verifyRegisterOtp(body);
      const otpData = await this.otpService.findOtp(body.otp, body.email);
      if (otpData && otpData.isExpired) {
        await this.otpService.deleteOtp(otpData.otp);
        return ResponseUtil.badRequest(res, i18n.t('lg.otpExp'));
      } else if (!otpData) {
        return ResponseUtil.badRequest(res, i18n.t('lg.otpIvl'));
      } else {
        return ResponseUtil.success(res, null, i18n.t('lg.verifyOtpsc'));
      }
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Post('/register')
  @Swagger(authSwagger.register)
  async register(
    @Res() res: Response,
    @Body() body: RegisterDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const otpData = await this.otpService.findOtp(body.otp, body.email);
      if (otpData && otpData.isVerified) {
        const response = await this.authService.register(body);
        return ResponseUtil.created(res, response, i18n.t('lg.registerSc'));
      } else if (!otpData) {
        return ResponseUtil.badRequest(res, i18n.t('lg.accNotExt'));
      } else {
        return ResponseUtil.badRequest(res, i18n.t('lg.notVerifyEmail'));
      }
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Post('/login')
  @Swagger(authSwagger.login)
  async login(
    @Res() res: Response,
    @Body() body: LoginDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const user = await this.authService.login(body);
      if (!user) {
        return ResponseUtil.badRequest(res, i18n.t('lg.userNotFound'));
      }
      const accessToken = await this.jwtService.signAsync({
        userId: user.userId,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
      });
      const data = {
        ...TransformDataUtil.serialize(UserDto, user),
        accessToken,
      };
      return ResponseUtil.success(res, data, i18n.t('lg.loginSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Post('/send-mail-forget')
  @Swagger(authSwagger.sendMailRegister)
  async sendMailForgetPassword(
    @Res() res: Response,
    @Body() body: Partial<ForgetPasswordDto>,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const { email } = body;
      if (!email) {
        return ResponseUtil.badRequest(res, i18n.t('lg.emailRq'));
      }
      const isMailExisted = await this.mailService.checkExistedMail(email);
      if (!isMailExisted) {
        return ResponseUtil.badRequest(res, i18n.t('lg.accNotExt'));
      }
      await this.authService.sendMailRegister(email, OtpTypeEnum.forget);
      return ResponseUtil.success(res, null, i18n.t('lg.sendOtpSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Put('/change-forget-password')
  @Swagger(authSwagger.sendMailRegister)
  async changeForgetPassword(
    @Res() res: Response,
    @Body() body: ForgetPasswordDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const otpData = await this.otpService.findOtp(body.otp, body.email);
      if (otpData && otpData.isVerified) {
        await this.authService.changeForgetPassword(body);
        return ResponseUtil.success(res, null, i18n.t('lg.changePwSc'));
      } else if (!otpData) {
        return ResponseUtil.badRequest(res, i18n.t('lg.accNotExt'));
      } else {
        return ResponseUtil.badRequest(res, i18n.t('lg.notVerifyEmail'));
      }
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }
}
