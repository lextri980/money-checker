import { BaseEntity } from 'src/databases/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  categoryId: string;

  @Column()
  categoryName: string;

  @OneToMany(() => Product, (repo) => repo.category)
  products: Product[];
}
