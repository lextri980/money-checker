import { IsNotEmpty, IsOptional } from 'class-validator';
import { Model } from 'src/modules/model/model.entity';

export class CreateProductDto {
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  brand: string;

  @IsOptional()
  models: Model[];

  @IsOptional()
  inStock: string;

  @IsOptional()
  price: string;
}
