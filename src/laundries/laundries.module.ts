import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laundry } from './laundry.entity';
import { LaundriesService } from './laundries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Laundry])],
  providers: [LaundriesService],
  exports: [TypeOrmModule, LaundriesService],
})
export class LaundriesModule {}
