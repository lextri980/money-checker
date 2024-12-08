import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLoanController } from './user-loan.controller';
import { UserLoan } from './user-loan.entity';
import { UserLoanService } from './user-loan.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserLoan]), UserModule],
  controllers: [UserLoanController],
  providers: [UserLoanService],
  exports: [UserLoanService],
})
export class UserLoanModule {}
