import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLoanController } from './user-loan.controller';
import { UserLoan } from './user-loan.entity';
import { UserLoanService } from './user-loan.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserLoan])],
  controllers: [UserLoanController],
  providers: [UserLoanService],
})
export class UserLoanModule {}
