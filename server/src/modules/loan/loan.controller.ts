import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { ResponseUtil } from 'src/utils';
import { CurrentUser } from './../../decorators/current-user.decorator';
import { User } from './../user/user.entity';
import { CreateLoanDto } from './dto/create-loan-dto';
import { LoanService } from './loan.service';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get('/list')
  @UseGuards(AuthGuard)
  async getLoanList(@Res() res: Response, @CurrentUser() currentUser: User) {
    const loanList = await this.loanService.getLoanList(currentUser.userId);
    return ResponseUtil.success(res, loanList, 'Get loan list successfully');
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  async createLoan(
    @Res() res: Response,
    @Body() body: CreateLoanDto[],
    @CurrentUser() currentUser: User,
  ) {
    const data = await this.loanService.createLoan(body, currentUser);
    return ResponseUtil.success(res, data, 'Loan created successfully');
  }
}
