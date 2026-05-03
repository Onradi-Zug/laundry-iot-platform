import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from './machine.entity';
import { MachinesService } from './machines.service';
import { Laundry } from '../laundries/laundry.entity';
import { Tenant } from '../tenants/tenant.entity';
import { Booking } from '../bookings/booking.entity';
import { Event } from '../events/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Machine, Laundry, Tenant, Booking, Event]),
  ],
  providers: [MachinesService],
  exports: [MachinesService],
})
export class MachinesModule {}
