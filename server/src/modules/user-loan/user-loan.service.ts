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

  async findUserLoan(userLoanId: string) {
    const userLoan = await this.userLoanRepo.findOne({
      where: { userLoanId },
    });
    return userLoan;
  }

  async findUserLoanByName(name: string) {
    const userLoan = await this.userLoanRepo.find({
      where: { name },
    });
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
    console.log(body);
    const mappedBody = body.map((item) => {
      return {
        name: item.name,
        totalMoney: 0,
        user: { userId },
      };
    });
    console.log(mappedBody);
    const initUserLoans = this.userLoanRepo.create();
    const newUserLoans = await this.userLoanRepo.save(initUserLoans);
    return newUserLoans;
  }
}
