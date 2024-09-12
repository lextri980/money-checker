import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
})
export class ProvinceModule {}
