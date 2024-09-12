import { BaseEntity } from 'src/databases/base.entity';
import { TransformDataUtil } from 'src/utils';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from '../brand/brand.entity';
import { Category } from '../category/category.entity';
import { Model } from '../model/model.entity';
import { Review } from '../review/review.entity';
import { User } from '../user/user.entity';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column()
  productName: string;

  @OneToMany(() => ProductImage, (repo) => repo.product, {
    cascade: ['remove'],
  })
  images: ProductImage[];

  @Column('text')
  description: string;

  @Column({ default: 0 })
  price: number;

  @Column('decimal', {
    precision: 2,
    scale: 1,
    default: 0,
    transformer: TransformDataUtil.transformDecimalColumn(),
  })
  rating: number;

  @Column()
  inStock: number;

  @Column()
  address: string;

  @Column({ default: 0 })
  discount: number;

  @Column({ default: false })
  isRemoved: boolean;

  @OneToMany(() => Review, (repo) => repo.product, {
    cascade: ['remove'],
  })
  reviews: Review[];

  @OneToMany(() => Model, (repo) => repo.product, {
    cascade: ['remove'],
  })
  models: Model[];

  @ManyToOne(() => User, (repo) => repo.products)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Category, (repo) => repo.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => Brand, (repo) => repo.products)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;
}
