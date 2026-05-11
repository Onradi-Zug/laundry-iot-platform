import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import { MachinesService } from '../machines/machines.service';
import { RulesService } from '../rules/rules.service';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly machinesService: MachinesService,
    private readonly rulesService: RulesService,
  ) {}

  @Get('machine/:id')
  getByMachine(@Param('id') id: string) {
    return this.eventsService.findByMachine(id);
  }

  @Post('machine/:id')
  async createForMachine(
    @Param('id') id: string,
    @Body() body: { type: string; payload?: any },
  ) {
    const machine = await this.machinesService.findById(id);
    if (!machine) {
      return { ok: false, error: 'Machine not found' };
    }

    const event = await this.eventsService.create({
      machine,
      type: body.type,
      payload: body.payload ?? null,
    });

    // RuleEngine буде додано наступним кроком
    // await this.rulesService.onEvent(event);

    return { ok: true, event };
  }
}
