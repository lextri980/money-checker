import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { roleConstant } from 'src/constants';
import { Roles } from 'src/decorators';
import { AuthGuard, RoleGuard } from 'src/guards';
import { ResponseUtil } from 'src/utils';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@Controller('brand')
@ApiTags('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('/create-brand')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([roleConstant.ADMIN])
  async createBrand(
    @Res() res: Response,
    @Body() body: CreateBrandDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const findBrand = await this.brandService.findBrand(body.brandName);
      if (findBrand) {
        return ResponseUtil.badRequest(res, i18n.t('lg.brandExt'));
      }
      const response = await this.brandService.createBrand(body);
      return ResponseUtil.success(res, response, i18n.t('lg.createBrandSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }
}
