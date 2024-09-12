import { BaseEntity } from 'src/databases/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Loan } from './../loan/loan.entity';
import { User } from './../user/user.entity';

@Entity()
export class UserLoan extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userLoanId: string;

  @Column()
  name: string;

  @Column()
  totalMoney: number;

  @ManyToOne(() => User, (user) => user.userLoans)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Loan, (loan) => loan.userLoan, {
    cascade: ['remove'],
  })
  loans: Loan[];
}
