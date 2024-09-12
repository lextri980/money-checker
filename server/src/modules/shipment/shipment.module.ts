import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './shipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment])],
})
export class ShipmentModule {}
