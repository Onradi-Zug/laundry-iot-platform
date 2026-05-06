import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookings: BookingsService) {}

  @Get()
  getAllBookings() {
    return this.bookings.findAll();
  }

  @Get(':id')
  async getBooking(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.bookings.findById(id);
  }

  @Post()
  createBooking(@Body() dto: CreateBookingDto) {
    return this.bookings.create({
      user: { id: dto.userId } as any,
      machine: { id: dto.machineId } as any,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
    });
  }
}
