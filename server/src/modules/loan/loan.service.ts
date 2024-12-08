import { UserLoanService } from './../user-loan/user-loan.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../user/user.entity';
import { CreateLoanDto } from './dto/create-loan-dto';
import { Loan } from './loan.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan) private readonly loanRepo: Repository<Loan>,
    private readonly userLoanService: UserLoanService,
    private readonly userService: UserService,
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
      .orderBy('loan.triggerDate', 'DESC')
      .addOrderBy('loan.createdAt', 'DESC')
      .getMany();
    if (!loans) {
      throw new BadRequestException('Loans not found!');
    }
    return loans;
  }

  async createLoan(body: CreateLoanDto[], currentUser: User) {
    const userCreated = await this.userService.findUserById(currentUser.userId);
    if (!userCreated) {
      throw new BadRequestException(
        'The user creating this user loan does not exist!',
      );
    }

    for (const item of body) {
      const userLoan = await this.userLoanService.findUserLoanById(
        item.userLoanId,
      );
      if (!userLoan) {
        throw new BadRequestException(
          `User loan with ID ${item.userLoanId} not found`,
        );
      }
    }

    const transformBody = body.map((item) => {
      const [day, month, year] = item.triggerDate.split('-');
      const triggerDate = new Date(
        Date.UTC(+year, +month - 1, +day, 0, 0, 0, 0),
      );
      return {
        ...item,
        triggerDate: triggerDate,
        userLoan: { userLoanId: item.userLoanId },
        createdBy: { userId: currentUser.userId },
      };
    });

    transformBody.forEach(async (item) => {
      await this.userLoanService.updateTotalMoney(item.userLoanId, item.amount);
    });
    const initLoan = this.loanRepo.create(transformBody);
    const newLoan = await this.loanRepo.save(initLoan);
    return newLoan;
  }
}
