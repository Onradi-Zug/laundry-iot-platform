import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tariff } from './tariff.entity';
import { Transaction } from './transaction.entity';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tariff, Transaction])],
  providers: [BillingService],
  controllers: [BillingController],
  exports: [BillingService]
})
export class BillingModule {}
