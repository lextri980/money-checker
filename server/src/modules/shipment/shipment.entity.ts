import { BaseEntity } from 'src/databases/base.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shipment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  shipmentId: string;
}
