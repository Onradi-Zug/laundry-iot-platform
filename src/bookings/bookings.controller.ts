import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookings: BookingsService) {}

  @Get()
  getAllBookings() {
    return this.bookings.findAll();
  }

  @Get(':id')
  getBooking(@Param('id') id: string) {
    return this.bookings.findById(id);
  }

  @Post()
  createBooking(
    @Body()
    body: {
      userId: string;
      machineId: string;
      startTime: string;
      endTime: string;
    }
  ) {
    return this.bookings.create({
      user: { id: body.userId } as any,
      machine: { id: body.machineId } as any,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime)
    });
  }
}
