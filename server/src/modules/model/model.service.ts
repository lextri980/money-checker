import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProductModelDto } from './../product/dto/update-product-model.dto';
import { CreateModelDto } from './dto/create-model.dto';
import { Model } from './model.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model) private readonly modelRepo: Repository<Model>,
  ) {}

  async findModel(modelId: string) {
    try {
      const response = await this.modelRepo
        .createQueryBuilder('model')
        .leftJoinAndSelect('model.product', 'product')
        .leftJoinAndSelect('product.user', 'user')
        .select(['model', 'product.productId', 'user.userId'])
        .where('model.modelId = :modelId', {
          modelId,
        })
        .getOne();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findModelByProduct(productId: string) {
    try {
      const models = await this.modelRepo
        .createQueryBuilder('model')
        .leftJoinAndSelect('model.product', 'product')
        .select(['model', 'product.productId'])
        .where('model.product = :productId', { productId })
        .getMany();
      return models;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createModels(productId: string, body: CreateModelDto[]) {
    try {
      const bodyRequest = body.map((item) => {
        return {
          modelName: item.modelName,
          modelPrice: item.modelPrice,
          modelInStock: item.modelInStock,
          product: { productId },
        };
      });
      const createdModels = this.modelRepo.create(bodyRequest);
      const response = await this.modelRepo.save(createdModels);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateModels(modelId: string, body: UpdateProductModelDto) {
    try {
      await this.modelRepo
        .createQueryBuilder('model')
        .update(Model)
        .set(body)
        .where(`model.modelId = :modelId`, {
          modelId,
        })
        .execute();
    } catch (error) {
      throw new Error(error);
    }
  }
}
