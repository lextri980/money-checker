import { IsNotEmpty } from 'class-validator';

export class CreateUserLoanDto {
  @IsNotEmpty()
  name: string;
}
