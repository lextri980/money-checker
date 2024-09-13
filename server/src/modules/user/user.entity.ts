import { Loan } from './../loan/loan.entity';
import { UserLoan } from './../user-loan/user-loan.entity';
import { BaseEntity } from 'src/databases/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UserLoan, (userLoan) => userLoan.user, {
    cascade: ['remove'],
  })
  userLoans: UserLoan[];

  @OneToMany(() => Loan, (loan) => loan.createdBy, {
    cascade: ['remove'],
  })
  loans: Loan[];
}
