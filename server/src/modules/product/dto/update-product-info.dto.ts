import { IsNotEmpty } from 'class-validator';

export class UpdateProductInfoDto {
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
}
