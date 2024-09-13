import { UserLoanService } from './../user-loan/user-loan.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../user/user.entity';
import { CreateLoanDto } from './dto/create-loan-dto';
import { Loan } from './loan.entity';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan) private readonly loanRepo: Repository<Loan>,
    private readonly userLoanService: UserLoanService,
  ) {}

  async getLoanList(userId: string) {
    const loans = await this.loanRepo
      .createQueryBuilder('loan')
      .leftJoinAndSelect('loan.createdBy', 'user')
      .leftJoinAndSelect('loan.userLoan', 'userLoan')
      .select([
        'loan',
        'user.userId',
        'user.name',
        'userLoan.name',
        'userLoan.userLoanId',
      ])
      .where(`user.userId = :userId`, {
        userId,
      })
      .orderBy('loan.createdAt', 'DESC')
      .getMany();
    if (!loans) {
      throw new BadRequestException('Loans not found!');
    }
    return loans;
  }

  async createLoan(body: CreateLoanDto[], currentUser: User) {
    const transformBody = body.map((item) => {
      const [day, month, year] = item.triggerDate.split('-');
      const triggerDate = new Date(+year, +month - 1, +day);
      return {
        ...item,
        triggerDate: triggerDate,
        userLoan: { userLoanId: item.userLoanId },
        createdBy: { userId: currentUser.userId },
      };
    });

    transformBody.forEach(async (item) => {
      console.log(item);
      await this.userLoanService.updateTotalMoney(item.userLoanId, item.amount);
    });
    const initLoan = this.loanRepo.create(transformBody);
    const newLoan = await this.loanRepo.save(initLoan);
    return newLoan;
  }
}
