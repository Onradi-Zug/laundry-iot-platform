import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(payload: {
    user: { id: string };
    machine: { id: string };
    startTime: Date;
    endTime: Date;
  }): Promise<Booking> {
    const booking = this.bookingRepository.create({
      user: { id: payload.user.id } as any,
      machine: { id: payload.machine.id } as any,
      startTime: payload.startTime,
      endTime: payload.endTime,
      status: 'active',
    });

    const saved = await this.bookingRepository.save(booking);
    // Ensure password is not leaked (defensive)
    if (saved.user && (saved.user as any).password) {
      delete (saved.user as any).password;
    }
    return saved;
  }

  async findById(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'machine'],
    });

    if (!booking) {
      throw new NotFoundException(`Booking ${id} not found`);
    }

    // Defensive: remove password if present in the returned object
    if (booking.user && (booking.user as any).password) {
      delete (booking.user as any).password;
    }

    return booking;
  }

  async findAll(): Promise<Booking[]> {
    const bookings = await this.bookingRepository.find({
      relations: ['user', 'machine'],
      order: { startTime: 'DESC' },
    });

    // Defensive: strip password from every user object
    for (const b of bookings) {
      if (b.user && (b.user as any).password) {
        delete (b.user as any).password;
      }
    }

    return bookings;
  }

  // Optional helper used by controller DTO flow
  async createFromDto(dto: CreateBookingDto) {
    return this.create({
      user: { id: dto.userId },
      machine: { id: dto.machineId },
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
    });
  }
}
