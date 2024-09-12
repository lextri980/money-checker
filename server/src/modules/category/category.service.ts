import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransformDataUtil } from 'src/utils';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async findCategory(categoryName: string) {
    try {
      const response = await this.categoryRepo.findOne({
        where: {
          categoryName,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCategoryList() {
    try {
      const response = await this.categoryRepo.find({
        order: {
          categoryName: 'ASC',
        },
      });
      const categoryList = response.map((item) => {
        return TransformDataUtil.serialize(CategoryDto, item);
      });
      return categoryList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCategory(body: CreateCategoryDto) {
    try {
      const createdCategory = this.categoryRepo.create(body);
      const response = await this.categoryRepo.save(createdCategory);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
