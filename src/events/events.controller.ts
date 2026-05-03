import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('machine/:id')
  getByMachine(@Param('id') id: string) {
    return this.eventsService.findByMachine(id);
  }
}
