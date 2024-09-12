import { IsNotEmpty } from 'class-validator';

export class UpdateProductModelDto {
  @IsNotEmpty()
  modelName: string;

  @IsNotEmpty()
  modelPrice: number;

  @IsNotEmpty()
  modelInStock: number;
}
