import { BaseEntity } from 'src/databases/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class Model extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  modelId: string;

  @Column()
  modelName: string;

  @Column()
  modelPrice: number;

  @Column({ default: 0 })
  modelInStock: number;

  @ManyToOne(() => Product, (repo) => repo.models, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
