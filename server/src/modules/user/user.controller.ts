import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { roleConstant } from 'src/constants';
import { CurrentUser, Roles } from 'src/decorators';
import { CurrentUserDto } from 'src/dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { ResponseUtil } from 'src/utils';
import { ValidateUtil } from 'src/utils/validate.util';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GetUserListQueryDto } from './dto/get-user-list-query.dto';
import { UpdateInformationDto } from './dto/update-infomation.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get('/profile')
  @UseGuards(AuthGuard)
  async getProfile(
    @Res() res: Response,
    @CurrentUser() currentUser: CurrentUserDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const user = await this.userService.getProfile(currentUser.userId);
      if (!user) {
        return ResponseUtil.badRequest(res, 'User not found!');
      }
      return ResponseUtil.success(res, user, i18n.t('lg.getProfileSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Put('/update-avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async updateAvatar(
    @Res() res: Response,
    @CurrentUser() user: CurrentUserDto,
    @Query() query: { isRemove: string },
    @I18n() i18n: I18nContext,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    try {
      if (query.isRemove) {
        await this.userService.updateAvatar(user.userId, null, query.isRemove);
        return ResponseUtil.success(res, null, i18n.t('lg.removeAvaSc'));
      } else {
        if (!file) {
          return ResponseUtil.badRequest(res, i18n.t('lg.fileRq'));
        }
        if (file && file.size > 3145728) {
          return ResponseUtil.badRequest(res, i18n.t('lg.fileMaxSize'));
        }
        const uploadedFile = await this.cloudinaryService.uploadFile(file);
        await this.userService.updateAvatar(user.userId, uploadedFile);
        return ResponseUtil.success(res, null, i18n.t('lg.updateAvaSc'));
      }
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Put('/change-password')
  @UseGuards(AuthGuard)
  async changePassword(
    @Res() res: Response,
    @CurrentUser() currentUser: CurrentUserDto,
    @Body() body: ChangePasswordDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const user = await this.userService.findUser(currentUser.userId);
      if (body.curPassword !== user.password) {
        return ResponseUtil.badRequest(res, i18n.t('lg.wrongCurPw'));
      }
      await this.userService.changePassword(
        currentUser.userId,
        body.newPassword,
      );
      return ResponseUtil.success(res, null, i18n.t('lg.updatePwSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Put('/update-information')
  @UseGuards(AuthGuard)
  async updateInformation(
    @Res() res: Response,
    @CurrentUser() user: CurrentUserDto,
    @Body() body: UpdateInformationDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      if (ValidateUtil.isNullOrEmpty(body)) {
        return ResponseUtil.badRequest(res, i18n.t('lg.missInfo'));
      }
      await this.userService.updateInformation(user, body);
      return ResponseUtil.success(res, null, i18n.t('lg.updateInfoSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Get('/list')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([roleConstant.ADMIN])
  async getUserList(
    @Res() res: Response,
    @Query() query: GetUserListQueryDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const { data, paginator } = await this.userService.getUserList(query);

      return ResponseUtil.success(
        res,
        data,
        i18n.t('lg.getUserListSc'),
        paginator,
      );
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Get('/detail/:userId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([roleConstant.ADMIN])
  async getUserDetail(
    @Res() res: Response,
    @Param('userId') userId: string,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const response = await this.userService.getUserDetail(userId);

      return ResponseUtil.success(res, response, i18n.t('lg.getUserSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Put('change-role')
  @UseGuards(AuthGuard)
  async changeUserRole(
    @Res() res: Response,
    @CurrentUser() user: CurrentUserDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const roleObj = {
        1: 'vendor',
        2: 'customer',
      };
      const getuser = await this.userService.findUser(user.userId);
      if (getuser.role === 0) {
        return ResponseUtil.badRequest(res, i18n.t('lg.noChangeRole'));
      } else {
        const currentRole = await this.userService.changeUserRole(getuser);
        return ResponseUtil.success(
          res,
          null,
          i18n.t('lg.changeRoleSc', {
            args: { role: roleObj[currentRole] },
          }),
        );
      }
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }
}
