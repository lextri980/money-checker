import { OtpTypeEnum } from 'src/constants';
import { BaseEntity } from 'src/databases/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Otp extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  otpId: string;

  @Column()
  otp: string;

  @Column({ nullable: true })
  email: string;

  @Column({
    type: 'enum',
    enum: OtpTypeEnum,
    default: OtpTypeEnum.register,
  })
  type: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column()
  expiredTime: Date;

  @Column({ default: false })
  isExpired: boolean;
}
