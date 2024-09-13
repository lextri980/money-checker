import { sumBy } from 'lodash';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserLoanDto } from './dto/create-user-loan.dto';
import { UserLoan } from './user-loan.entity';

@Injectable()
export class UserLoanService {
  constructor(
    @InjectRepository(UserLoan)
    private readonly userLoanRepo: Repository<UserLoan>,
  ) {}

  async findUserLoanById(userLoanId: string) {
    const userLoan = await this.userLoanRepo
      .createQueryBuilder('userLoan')
      .leftJoinAndSelect('userLoan.loans', 'loan')
      .where('userLoan.userLoanId = :userLoanId', { userLoanId })
      .getOne();
    if (!userLoan) {
      throw new BadRequestException('User loan not found');
    }
    return userLoan;
  }

  async findUserLoanByName(name: string) {
    const userLoan = await this.userLoanRepo
      .createQueryBuilder('userLoan')
      .where('userLoan.name = :name', { name })
      .getOne();
    if (!userLoan) {
      throw new BadRequestException('User loan not found');
    }
    return userLoan;
  }

  async findUserLoanList(userId: string) {
    const userLoan = await this.userLoanRepo
      .createQueryBuilder('userLoan')
      .where('userLoan.user.userId = :userId', { userId })
      .orderBy('userLoan.name', 'ASC')
      .getMany();
    return userLoan;
  }

  async createUserLoan(body: CreateUserLoanDto[], userId: string) {
    const names = body.map((item) => item.name);
    const existingLoans = await this.userLoanRepo.find({
      where: { name: In(names) },
    });
    if (existingLoans.length > 0) {
      const existingNames = existingLoans.map((loan) => loan.name).join(', ');
      throw new BadRequestException(
        `The following loan names already exist: ${existingNames}`,
      );
    }
    const mappedBody = body.map((item) => {
      return {
        name: item.name,
        totalMoney: 0,
        user: { userId },
      };
    });
    const initUserLoans = this.userLoanRepo.create(mappedBody);
    const newUserLoans = await this.userLoanRepo.save(initUserLoans);
    return newUserLoans;
  }

  async updateTotalMoney(userLoanId: string, money: number) {
    const userLoan = await this.findUserLoanById(userLoanId);
    if (!userLoan) {
      throw new BadRequestException('User loan not found!');
    }
    const totalMoney = sumBy(userLoan.loans, 'amount') + money;

    const updatedUserLoan = await this.userLoanRepo
      .createQueryBuilder('userLoanId')
      .update(UserLoan)
      .set({
        totalMoney,
      })
      .where('userLoanId = :userLoanId', { userLoanId })
      .execute();
    return updatedUserLoan;
  }
}
