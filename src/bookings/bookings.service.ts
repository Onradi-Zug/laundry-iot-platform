import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(data: {
    user: { id: string };
    machine: { id: string };
    startTime: Date;
    endTime: Date;
  }): Promise<Booking> {
    const booking = this.bookingRepository.create({
      user: { id: data.user.id } as any,
      machine: { id: data.machine.id } as any,
      startTime: data.startTime,
      endTime: data.endTime,
    });
    return this.bookingRepository.save(booking);
  }

  async findById(id: string): Promise<Booking | null> {
    return this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'machine'],
    });
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({ relations: ['user', 'machine'] });
  }
}
