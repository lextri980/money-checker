import { IsNotEmpty } from 'class-validator';

export class UpdateProductPriceDto {
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  inStock: number;
}
