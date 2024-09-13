import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLoanDto {
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  content: string;

  @IsNotEmpty()
  isDebt: boolean;

  @IsNotEmpty()
  triggerDate: string;

  @IsNotEmpty()
  userLoanId: string;
}
