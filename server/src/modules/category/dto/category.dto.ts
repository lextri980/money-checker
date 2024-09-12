import { Exclude, Expose } from 'class-transformer';

export class CategoryDto {
  @Expose()
  categoryId: string;

  @Expose()
  categoryName: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
