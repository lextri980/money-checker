import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from 'src/modules/model/model.entity';
import { ModelModule } from './../model/model.module';
import { UserModule } from './../user/user.module';
import { ProductImage } from './product-image.entity';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage, Model]),
    UserModule,
    ModelModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
