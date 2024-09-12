import { BaseEntity } from 'src/databases/base.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Voucher extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  voucherId: string;
}
