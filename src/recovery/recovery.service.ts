import { Injectable } from '@nestjs/common';
import { MachinesService } from '../machines/machines.service';
import { EventsService } from '../events/events.service';

@Injectable()
export class RecoveryService {
  constructor(
    private readonly machinesService: MachinesService,
    private readonly eventsService: EventsService,
  ) {}

  async checkMachines() {
    const machines = await this.machinesService.findAll();

    const now = Date.now();
    const THRESHOLD = 1000 * 60 * 30; // 30 хвилин

    const stuck = machines.filter((m: any) => {
      if (!m.lastEventAt) return false;
      const diff = now - new Date(m.lastEventAt).getTime();
      return diff > THRESHOLD && m.status === 'running';
    });

    return stuck;
  }
}
