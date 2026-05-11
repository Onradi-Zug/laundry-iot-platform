import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThan } from 'typeorm';
import { Booking } from './booking.entity';
import { MachinesService } from '../machines/machines.service';
import { UsersService } from '../users/users.service';
import { EventsService } from '../events/events.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    private readonly machinesService: MachinesService,
    private readonly usersService: UsersService,
    private readonly eventsService: EventsService,
  ) {}

  // ============================
  // CREATE BOOKING
  // ============================
  async create(payload: {
    userId: string;
    machineId: string;
    startTime: Date;
    endTime: Date;
  }): Promise<Booking> {
    const { userId, machineId, startTime, endTime } = payload;

    if (endTime <= startTime) {
      throw new BadRequestException('Invalid time range');
    }

    // 1) Перевіряємо користувача
    await this.usersService.findById(userId);

    // 2) Перевіряємо машину
    await this.machinesService.ensureAvailable(machineId);

    // 3) Перевіряємо перетини
    const overlapping = await this.bookingRepository.findOne({
      where: {
        machine: { id: machineId },
        startTime: Between(startTime, endTime),
      },
    });

    if (overlapping) {
      throw new BadRequestException('Machine already booked for this time');
    }

    // 4) Перевірка max duration
    const durationMinutes =
      (endTime.getTime() - startTime.getTime()) / 1000 / 60;

    if (durationMinutes > 180) {
      throw new BadRequestException('Booking duration exceeds limit (180 min)');
    }

    // 5) Перевірка max active bookings per user
    const activeUserBookings = await this.bookingRepository.count({
      where: {
        user: { id: userId },
        status: 'active',
      },
    });

    if (activeUserBookings >= 3) {
      throw new BadRequestException('User reached max active bookings');
    }

    // 6) Створюємо бронювання
    const booking = this.bookingRepository.create({
      user: { id: userId } as any,
      machine: { id: machineId } as any,
      startTime,
      endTime,
      status: 'active',
    });

    const saved = await this.bookingRepository.save(booking);

    // 7) Ставимо машину в busy
    await this.machinesService.updateStatus(machineId, 'busy');

    // 8) Подія booking_created
    await this.eventsService.create({
      machine: { id: machineId },
      type: 'booking_created',
      payload: {
        bookingId: saved.id,
        userId,
        startTime,
        endTime,
      },
    });

    return saved;
  }

  // ============================
  // FIND BY ID
  // ============================
  async findById(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'machine'],
    });

    if (!booking) {
      throw new NotFoundException(`Booking ${id} not found`);
    }

    if (booking.user && (booking.user as any).password) {
      delete (booking.user as any).password;
    }

    return booking;
  }

  // ============================
  // FIND ALL
  // ============================
  async findAll(): Promise<Booking[]> {
    const bookings = await this.bookingRepository.find({
      relations: ['user', 'machine'],
      order: { startTime: 'DESC' },
    });

    for (const b of bookings) {
      if (b.user && (b.user as any).password) {
        delete (b.user as any).password;
      }
    }

    return bookings;
  }

  // ============================
  // FINISH BOOKING
  // ============================
  async finish(id: string) {
    const booking = await this.findById(id);

    booking.status = 'finished';
    await this.bookingRepository.save(booking);

    await this.machinesService.updateStatus(booking.machine.id, 'idle');

    // Подія booking_finished
    await this.eventsService.create({
      machine: { id: booking.machine.id },
      type: 'booking_finished',
      payload: { bookingId: booking.id },
    });

    return booking;
  }

  // ============================
  // CANCEL BOOKING
  // ============================
  async cancel(id: string) {
    const booking = await this.findById(id);

    booking.status = 'cancelled';
    await this.bookingRepository.save(booking);

    await this.machinesService.updateStatus(booking.machine.id, 'idle');

    // Подія booking_cancelled
    await this.eventsService.create({
      machine: { id: booking.machine.id },
      type: 'booking_cancelled',
      payload