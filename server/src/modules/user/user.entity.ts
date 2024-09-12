import { BaseEntity } from 'src/databases/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';
import { Review } from '../review/review.entity';

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

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 2 })
  role: number;

  @Column({ default: false })
  isBanned: boolean;

  @OneToMany(() => Product, (repo) => repo.user)
  products: Product[];

  @OneToMany(() => Review, (repo) => repo.user)
  reviews: Review[];
}
