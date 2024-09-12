import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { min, sum } from 'lodash';
import { Model } from 'src/modules/model/model.entity';
import { GenerateDataUtil } from 'src/utils';
import { Repository } from 'typeorm';
import { CloudinaryResponse } from './../cloudinary/dto/cloudinary.type';
import { ModelService } from './../model/model.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductListQueryDto } from './dto/get-product-list.dto';
import { UpdateProductInfoDto } from './dto/update-product-info.dto';
import { UpdateProductModelDto } from './dto/update-product-model.dto';
import { UpdateProductPriceDto } from './dto/update-product-price';
import { ProductImage } from './product-image.entity';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,
    @InjectRepository(Model)
    private readonly modelRepo: Repository<Model>,
    private readonly modelService: ModelService,
  ) {}

  async findProduct(productId: string) {
    try {
      const response = await this.productRepo
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.user', 'user')
        .leftJoinAndSelect('product.models', 'model')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.brand', 'brand')
        .select([
          'product',
          'user.userId',
          'user.name',
          'model.modelId',
          'model.modelName',
          'category.categoryId',
          'category.categoryName',
          'brand.brandId',
          'brand.brandName',
        ])
        .where('product.productId = :productId', { productId })
        .getOne();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findProductByModel(modelId: string) {
    try {
      const product = await this.productRepo
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.models', 'model')
        .where(`model.modelId = :modelId`, { modelId })
        .getOne();
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductList(query: GetProductListQueryDto) {
    try {
      const { size, skip, sortKey, sortValue } =
        GenerateDataUtil.paginationFields(query);

      const selectQuery = this.productRepo
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.user', 'user')
        .leftJoinAndSelect('product.models', 'models')
        .leftJoinAndSelect('product.images', 'images')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.brand', 'brand')
        .select([
          'product',
          'user.userId',
          'models.modelId',
          'models.modelName',
          'models.modelPrice',
          'models.modelInStock',
          'images.image',
          'category.categoryId',
          'brand.brandId',
        ]);

      if (query.search) {
        selectQuery
          .where('product.productName LIKE :search', {
            search: `%${query.search}%`,
          })
          .orWhere('product.address LIKE :search', {
            search: `%${query.search}%`,
          });
      } else {
        if (query.productName) {
          selectQuery.where('product.productName LIKE :productName', {
            productName: `%${query.productName}%`,
          });
        }
        if (query.rating) {
          selectQuery.andWhere('FLOOR(product.rating) = :rating', {
            rating: Number(query.rating),
          });
        }
        if (query.minPrice) {
          selectQuery.andWhere(`product.price >= :minPrice`, {
            minPrice: Number(query.minPrice),
          });
        }
        if (query.maxPrice) {
          selectQuery.andWhere(`product.price <= :maxPrice`, {
            maxPrice: Number(query.maxPrice),
          });
        }
        if (query.user) {
          selectQuery.andWhere('user.name LIKE :user', {
            user: `%${query.user}%`,
          });
        }
        if (query.category) {
          selectQuery.andWhere('category.categoryName LIKE :category', {
            category: `%${query.category}%`,
          });
        }
        if (query.brand) {
          selectQuery.andWhere('brand.brandName LIKE :brand', {
            brand: `%${query.brand}%`,
          });
        }
      }

      const [productList, totalData] = await selectQuery
        .andWhere('product.isRemoved = :isRemoved', { isRemoved: false })
        .orderBy(`product.${sortKey}`, sortValue)
        .take(size)
        .skip(skip)
        .getManyAndCount();

      const products = productList.map((item) => {
        return {
          ...item,
          user: item.user.userId,
          category: item.category.categoryId,
          brand: item.brand.brandId,
        };
      });

      const totalPage = Math.ceil(totalData / size);

      return {
        data: products,
        paginator: {
          page: Number(query.page) || 1,
          size,
          totalPage: totalPage || 1,
          totalData,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProduct(
    userId: string,
    body: CreateProductDto,
    files: CloudinaryResponse[],
  ) {
    try {
      const {
        productName,
        description,
        address,
        category,
        brand,
        models,
        inStock,
        price,
      } = body;
      let priceRange: number[];
      let inStockProduct: number;
      if (models && models.length > 0) {
        priceRange = models.map((item) => Number(item.modelPrice));
        inStockProduct = sum(models.map((item) => Number(item.modelInStock)));
      }
      const imgUrls = files.map((item) => {
        return item.url;
      });
      const createdProduct = this.productRepo.create({
        user: { userId },
        productName,
        description,
        inStock: inStockProduct ?? Number(inStock),
        address,
        price: priceRange ? min(priceRange) : Number(price),
        category: { categoryId: category },
        brand: { brandId: brand },
      });
      const product = await this.productRepo.save(createdProduct);
      if (models && models.length > 0) {
        await this.modelService.createModels(product.productId, models);
      }
      await this.createProductImg(imgUrls, product.productId);
      return {
        ...product,
        user: product.user.userId,
        category: product.category.categoryId,
        brand: product.brand.brandId,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProductImg(imgs: string[], productId: string) {
    try {
      const bodyRequest = imgs.map((image) => {
        return {
          image,
          product: { productId },
        };
      });
      const createdProductImg = this.productImageRepo.create(bodyRequest);
      const response = await this.productImageRepo.save(createdProductImg);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProductModel(
    productId: string,
    modelId: string,
    body: UpdateProductModelDto,
  ) {
    try {
      const updatedModel = await this.modelRepo
        .createQueryBuilder('model')
        .update(Model)
        .set(body)
        .where(`model.modelId = :modelId`, {
          modelId,
        })
        .execute();
      if (updatedModel.affected) {
        const modelListOfProduct =
          await this.modelService.findModelByProduct(productId);
        const priceRange: number[] = modelListOfProduct.map((item) =>
          Number(item.modelPrice),
        );
        const inStockProduct: number = sum(
          modelListOfProduct.map((item) => Number(item.modelInStock)),
        );

        const updatedProduct = await this.productRepo
          .createQueryBuilder('product')
          .update(Product)
          .set({
            price: min(priceRange),
            inStock: inStockProduct,
          })
          .where(`product.productId = :productId`, {
            productId,
          })
          .execute();
        if (updatedProduct.affected) {
          const product = await this.findProduct(productId);
          return product;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProductPrice(productId: string, body: UpdateProductPriceDto) {
    try {
      const updateProduct = await this.productRepo
        .createQueryBuilder('product')
        .update(Product)
        .set(body)
        .where(`product.productId = :productId`, { productId })
        .execute();
      if (updateProduct.affected) {
        const product = await this.findProduct(productId);
        return product;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProductInfo(productId: string, body: UpdateProductInfoDto) {
    try {
      const updatedProduct = await this.productRepo
        .createQueryBuilder('product')
        .update(Product)
        .set({
          ...body,
          category: { categoryId: body.category },
          brand: { brandId: body.brand },
        })
        .where(`product.productId = :productId`, { productId })
        .execute();
      if (updatedProduct.affected) {
        const product = await this.findProduct(productId);
        return product;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProduct(product: Product) {
    try {
      const deletedProduct = await this.productRepo.remove(product);
      return deletedProduct;
    } catch (error) {
      throw new Error(error);
    }
  }
}
