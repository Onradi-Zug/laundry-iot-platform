import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tariff } from './tariff.entity';
import { Transaction } from './transaction.entity';
import { Booking } from '../bookings/booking.entity';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Tariff)
    private readonly tariffs: Repository<Tariff>,
    @InjectRepository(Transaction)
    private readonly transactions: Repository<Transaction>
  ) {}

  async getActiveTariff(tenantId: string) {
    return this.tariffs.findOne({
      where: { tenant: { id: tenantId }, active: true }
    });
  }

  async calculatePrice(booking: Booking, tariff: Tariff) {
    if (tariff.pricePerCycle) return tariff.pricePerCycle;

    const minutes =
      (booking.endTime.getTime() - booking.startTime.getTime()) / 60000;

    return Math.ceil(minutes * tariff.pricePerMinute);
  }

  async createTransaction(data: Partial<Transaction>) {
    const t = this.transactions.create(data);
    return this.transactions.save(t);
  }

  async markPaid(id: string) {
    return this.transactions.update(id, { status: 'paid' });
  }

  async markFailed(id: string) {
    return this.transactions.update(id, { status: 'failed' });
  }
}
