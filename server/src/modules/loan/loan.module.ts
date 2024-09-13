import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLoanModule } from './../user-loan/user-loan.module';
import { LoanController } from './loan.controller';
import { Loan } from './loan.entity';
import { LoanService } from './loan.service';

@Module({
  imports: [TypeOrmModule.forFeature([Loan]), UserLoanModule],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
