import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './voucher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher])],
})
export class VoucherModule {}
