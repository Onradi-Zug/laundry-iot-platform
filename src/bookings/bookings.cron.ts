import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Booking } from './booking.entity';
import { MachinesService } from '../machines/machines.service';
import { EventsService } from '../events/events.service';

@Injectable()
export class BookingsCron {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly machinesService: MachinesService,
    private readonly eventsService: EventsService,
  ) {}

  // Кожну хвилину перевіряємо прострочені бронювання
  @Cron(CronExpression.EVERY_MINUTE)
  async autoFinishExpiredBookings() {
    const now = new Date();

    const expired = await this.bookingRepository.find({
      where: {
        status: 'active',
        endTime: LessThan(now),
      },
      relations: ['machine'],
    });

    for (const booking of expired) {
      booking.status = 'finished';
      await this.bookingRepository.save(booking);

      // Машина → idle
      await this.machinesService.updateStatus(booking.machine.id, 'idle');

      // Подія booking_auto_finished
      await this.eventsService.create({
        machine: { id: booking.machine.id },
        type: 'booking_auto_finished',
        payload: {
          bookingId: booking.id,
          machineId: booking.machine.id,
          endedAt: now,
        },
      });
    }
  }
}
