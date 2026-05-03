import { Injectable } from '@nestjs/common';
import { MachinesService } from '../machines/machines.service';
import { EventsService } from '../events/events.service';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly machines: MachinesService,
    private readonly events: EventsService,
  ) {}

  async getOverview() {
    const machines = await this.machines.findByLaundry(null as any);

    const running = machines.filter(m => m.status === 'running').length;
    const idle = machines.filter(m => m.status === 'idle').length;
    const error = machines.filter(m => m.status === 'error').length;

    const recentErrors = await this.events.findErrors();

    return {
      running,
      idle,
      error,
      recentErrors,
    };
  }
}
