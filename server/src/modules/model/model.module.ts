import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './model.entity';
import { ModelService } from './model.service';

@Module({
  imports: [TypeOrmModule.forFeature([Model])],
  providers: [ModelService],
  exports: [ModelService],
})
export class ModelModule {}
