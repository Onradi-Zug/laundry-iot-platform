import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookingsService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingsService.create({
      userId: dto.userId,
      machineId: dto.machineId,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
    });
  }

  @Patch(':id/finish')
  finish(@Param('id') id: string) {
    return this.bookingsService.finish(id);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.bookingsService.cancel(id);
  }
}
