import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laundry } from './laundry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Laundry])],
  exports: [TypeOrmModule],
})
export class LaundriesModule {}
