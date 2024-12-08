import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Roles, Swagger } from 'src/decorators';
import { ResponseUtil, TransformDataUtil } from 'src/utils';
import { UserDto } from '../user/dto/user.dto';
import { roleConstant } from './../../constants/common.constant';
import { AuthGuard } from './../../guards/auth.guard';
import { RoleGuard } from './../../guards/role.guard';
import { AuthService } from './auth.service';
import { authSwagger } from './auth.swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/register')
  @Swagger(authSwagger.register)
  async register(@Res() res: Response, @Body() body: RegisterDto) {
    const user = await this.authService.register(body);
    return ResponseUtil.success(res, user, 'Register successfully');
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
        role: user.role,
        isActivate: user.isActivate,
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

  @Put('activate-account/:userId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([roleConstant.ROOT_ADMIN])
  async activateAccount(@Res() res: Response, @Param('userId') id: string) {
    await this.authService.activateAccount(id);
    return ResponseUtil.success(res, null, 'Activate account successfully!');
  }
}
