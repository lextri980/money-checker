import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { roleConstant } from 'src/constants';
import { Roles } from 'src/decorators';
import { AuthGuard, RoleGuard } from 'src/guards';
import { ResponseUtil } from 'src/utils';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/list')
  @UseGuards(AuthGuard)
  async getCategoryList(@Res() res: Response, @I18n() i18n: I18nContext) {
    try {
      const response = await this.categoryService.getCategoryList();
      return ResponseUtil.success(res, response, i18n.t('lg.getCtgListSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Post('/create')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([roleConstant.ADMIN])
  async async(
    @Res() res: Response,
    @Body() body: CreateCategoryDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const findCategory = await this.categoryService.findCategory(
        body.categoryName,
      );
      if (findCategory) {
        return ResponseUtil.badRequest(res, i18n.t('lg.categoryExt'));
      }
      const response = await this.categoryService.createCategory(body);
      return ResponseUtil.success(res, response, i18n.t('lg.createCtgSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }
}
