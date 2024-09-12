import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { roleConstant } from 'src/constants';
import { CurrentUser, Roles } from 'src/decorators';
import { CurrentUserDto } from 'src/dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { ResponseUtil } from 'src/utils';
import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { ModelService } from './../model/model.service';
import { UserService } from './../user/user.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductListQueryDto } from './dto/get-product-list.dto';
import { UpdateProductModelQueryDto } from './dto/query.dto';
import { UpdateProductInfoDto } from './dto/update-product-info.dto';
import { UpdateProductModelDto } from './dto/update-product-model.dto';
import { UpdateProductPriceDto } from './dto/update-product-price';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly modelService: ModelService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get('/list')
  async getProductList(
    @Res() res: Response,
    @Query() query: GetProductListQueryDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const { data, paginator } =
        await this.productService.getProductList(query);

      return ResponseUtil.success(
        res,
        data,
        i18n.t('lg.getPrdListSc'),
        paginator,
      );
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Get('/detail/:productId')
  async getProductDetail(
    @Res() res: Response,
    @Param('productId') productId: string,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const product = await this.productService.findProduct(productId);
      if (!product) {
        return ResponseUtil.badRequest(res, i18n.t('lg.prdNotFound'));
      }
      return ResponseUtil.success(res, product, i18n.t('lg.getPrdSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Post('/create')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([roleConstant.VENDOR])
  @UseInterceptors(FilesInterceptor('images'))
  async createProduct(
    @Res() res: Response,
    @Body() body: CreateProductDto,
    @CurrentUser() currentUser: CurrentUserDto,
    @I18n() i18n: I18nContext,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    try {
      const user = await this.userService.findUser(currentUser.userId);
      if (!user) {
        return ResponseUtil.badRequest(res, i18n.t('lg.userNotFound'));
      }
      if (files.length === 0) {
        return ResponseUtil.badRequest(res, i18n.t('lg.prdNoImageSc'));
      }
      if (!body.models || body.models.length === 0) {
        if (!body.price) {
          return ResponseUtil.badRequest(res, i18n.t('lg.prdNoPriceSc'));
        }
        if (!body.inStock) {
          return ResponseUtil.badRequest(res, i18n.t('lg.prdNoStockSc'));
        }
      }
      const multipleFiles = await this.cloudinaryService.uploadFiles(files);
      const product = await this.productService.createProduct(
        user.userId,
        body,
        multipleFiles,
      );
      return ResponseUtil.success(res, product, i18n.t('lg.createPrdSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Put('/update-info/:productId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([roleConstant.VENDOR])
  async updateProductInfo(
    @Res() res: Response,
    @Param('productId') productId: string,
    @Body() body: UpdateProductInfoDto,
    @CurrentUser() currentUser: CurrentUserDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const product = await this.productService.findProduct(productId);
      if (!product) {
        return ResponseUtil.badRequest(res, i18n.t('lg.prdNotFound'));
      }
      if (product && product.user.userId !== currentUser.userId) {
        return ResponseUtil.badRequest(res, i18n.t('lg.onlyCurrentuser'));
      }
      const response = await this.productService.updateProductInfo(
        productId,
        body,
      );
      return ResponseUtil.success(res, response, i18n.t('lg.updatePrdSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Put('/update-model')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([roleConstant.VENDOR])
  async updateProductModel(
    @Res() res: Response,
    @Query() query: UpdateProductModelQueryDto,
    @Body() body: UpdateProductModelDto,
    @CurrentUser() currentUser: CurrentUserDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const { productId, modelId } = query;
      const product = await this.productService.findProduct(productId);
      const model = await this.modelService.findModel(modelId);

      if (!product) {
        return ResponseUtil.badRequest(res, i18n.t('lg.prdNotFound'));
      }
      if (product && currentUser.userId !== product.user.userId) {
        return ResponseUtil.badRequest(res, i18n.t('lg.onlyCurrentuser'));
      }

      if (!model) {
        return ResponseUtil.badRequest(res, i18n.t('lg.modelNotFound'));
      }
      if (model.product.productId !== productId) {
        return ResponseUtil.badRequest(res, i18n.t('lg.modelNotMatchPrd'));
      }
      const response = await this.productService.updateProductModel(
        productId,
        modelId,
        body,
      );
      return ResponseUtil.success(res, response, i18n.t('lg.updatePrdSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Put('/update-price/:productId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([roleConstant.VENDOR])
  async updateProductPrice(
    @Res() res: Response,
    @Param('productId') productId: string,
    @Body() body: UpdateProductPriceDto,
    @CurrentUser() currentUser: CurrentUserDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const product = await this.productService.findProduct(productId);
      if (!product) {
        return ResponseUtil.badRequest(res, i18n.t('lg.prdNotFound'));
      }
      if (product && currentUser.userId !== product.user.userId) {
        return ResponseUtil.badRequest(res, i18n.t('lg.onlyCurrentuser'));
      }
      if (product && product.models.length > 0) {
        return ResponseUtil.badRequest(res, i18n.t('lg.noUpdatePrdHaveModel'));
      }

      const response = await this.productService.updateProductPrice(
        productId,
        body,
      );
      return ResponseUtil.success(res, response, i18n.t('lg.updatePrdSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }

  @Delete('/remove/:productId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([roleConstant.VENDOR])
  async removeProduct(
    @Res() res: Response,
    @CurrentUser() currentUser: CurrentUserDto,
    @Param('productId') productId: string,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const user = await this.userService.findUser(currentUser.userId);
      if (!user) {
        return ResponseUtil.badRequest(res, i18n.t('lg.userNotFound'));
      }
      const product = await this.productService.findProduct(productId);
      if (!product) {
        return ResponseUtil.badRequest(res, i18n.t('lg.prdNotFound'));
      }
      if (user.userId !== product.user.userId) {
        return ResponseUtil.badRequest(res, i18n.t('lg.cantDel'));
      }
      const response = await this.productService.removeProduct(product);
      return ResponseUtil.success(res, response, i18n.t('lg.dltPrdSc'));
    } catch (error) {
      return ResponseUtil.serverError(res, error.stack);
    }
  }
}
