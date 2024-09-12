import { BaseEntity } from 'src/databases/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  productImageId: string;

  @Column()
  image: string;

  @ManyToOne(() => Product, (repo) => repo.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
