import { IsOptional } from 'class-validator';

export class PaginatorQueryDto {
  @IsOptional()
  sort: string;

  @IsOptional()
  page: string;

  @IsOptional()
  size: string;

  @IsOptional()
  search: string;
}

export class PaginatorDataDto {
  @IsOptional()
  page: number;

  @IsOptional()
  size: number;

  @IsOptional()
  totalPage: number;

  @IsOptional()
  totalData: number;
}
