import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
  ) {}

  async findBrand(brandName: string) {
    try {
      const response = await this.brandRepo.findOne({
        where: {
          brandName,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createBrand(body: CreateBrandDto) {
    try {
      const createdBrand = this.brandRepo.create(body);
      const data = this.brandRepo.save(createdBrand);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
