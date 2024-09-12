import { BaseEntity } from 'src/databases/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  reviewId: string;

  @Column()
  title: string;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @ManyToOne(() => User, (repo) => repo.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Product, (repo) => repo.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
