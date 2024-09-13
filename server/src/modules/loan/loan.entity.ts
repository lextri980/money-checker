import { User } from './../user/user.entity';
import { UserLoan } from './../user-loan/user-loan.entity';
import { BaseEntity } from 'src/databases/base.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Loan extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  loanId: string;

  @Column()
  amount: number;

  @Column()
  content: string;

  @Column({ default: true })
  isDebt: boolean;

  @Column()
  triggerDate: Date;

  @ManyToOne(() => UserLoan, (userLoan) => userLoan.loans)
  @JoinColumn({ name: 'userLoanId' })
  userLoan: UserLoan;

  @ManyToOne(() => User, (user) => user.loans)
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;
}
