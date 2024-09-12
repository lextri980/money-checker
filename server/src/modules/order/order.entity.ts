import { BaseEntity } from 'src/databases/base.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;
}
