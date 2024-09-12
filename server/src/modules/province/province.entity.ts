import { BaseEntity } from 'src/databases/base.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Province extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  provinceId: string;
}
