import { User } from './../user/user.entity';
import { CurrentUser } from './../../decorators/current-user.decorator';
import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseUtil } from 'src/utils';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateUserLoanDto } from './dto/create-user-loan.dto';
import { UserLoanService } from './user-loan.service';

@Controller('user-loan')
export class UserLoanController {
  constructor(private readonly userLoanService: UserLoanService) {}

  @Get('/list')
  @UseGuards(AuthGuard)
  async findUserLoanList(
    @Res() res: Response,
    @CurrentUser() currentUser: User,
  ) {
    const userLoan = await this.userLoanService.findUserLoanList(
      currentUser.userId,
    );
    if (!userLoan || userLoan.length === 0) {
      throw new BadRequestException('User loan not found!');
    }
    return ResponseUtil.success(res, userLoan, 'Find user loan successfully');
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  async createUserLoan(
    @Res() res: Response,
    @Body() body: CreateUserLoanDto[],
    @CurrentUser() user: User,
  ) {
    const userLoan = await this.userLoanService.createUserLoan(
      body,
      user.userId,
    );

    return ResponseUtil.success(
      res,
      userLoan,
      'Create user loans successfully',
    );
  }
}
