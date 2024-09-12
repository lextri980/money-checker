import { IsOptional } from 'class-validator';
import { PaginatorQueryDto } from 'src/dto';

export class GetProductListQueryDto extends PaginatorQueryDto {
  @IsOptional()
  productName: string;

  @IsOptional()
  minPrice: string;

  @IsOptional()
  maxPrice: string;

  @IsOptional()
  rating: string;

  @IsOptional()
  address: string;

  @IsOptional()
  user: string;

  @IsOptional()
  category: string;

  @IsOptional()
  brand: string;
}
