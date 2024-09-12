import { IsNotEmpty } from 'class-validator';

export class CreateModelDto {
  @IsNotEmpty()
  modelName: string;

  @IsNotEmpty()
  modelPrice: number;

  @IsNotEmpty()
  modelInStock: number;
}
