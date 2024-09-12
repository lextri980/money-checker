import { BaseEntity } from 'src/databases/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  brandId: string;

  @Column()
  brandName: string;

  @OneToMany(() => Product, (repo) => repo.brand)
  products: Product[];
}
