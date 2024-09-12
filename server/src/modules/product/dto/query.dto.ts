import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProductModelQueryDto {
  @IsNotEmpty()
  productId: string;

  @IsOptional()
  modelId: string;
}
