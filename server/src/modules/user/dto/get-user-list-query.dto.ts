import { IsOptional } from 'class-validator';
import { PaginatorQueryDto } from 'src/dto';

export class GetUserListQueryDto extends PaginatorQueryDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  address: string;

  @IsOptional()
  role: string;
}
