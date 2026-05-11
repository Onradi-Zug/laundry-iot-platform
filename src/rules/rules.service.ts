import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rule } from './rule.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { MachinesService } from '../machines/machines.service';
import { EventsService } from '../events/events.service';

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Rule)
    private readonly ruleRepository: Repository<Rule>,
    private readonly notificationsService: NotificationsService,
    private readonly machinesService: MachinesService,
    @Inject(forwardRef(() => EventsService))
    private readonly eventsService: EventsService,
  ) {}

  // === CRUD ===
  async create(data: any) {
    try {
      const entity = this.ruleRepository.create(data);
      return await this.ruleRepository.save(entity);
    } catch (err) {
      return { ok: false, error: (err as Error).message };
    }
  }

  async findOne(id: string) {
    return this.ruleRepository.findOne({ where: { id } });
  }

  async findAll() {
    return this.ruleRepository.find();
  }

  // === RULE ENGINE ===
  async onEvent(event: any) {
    const rules = await this.ruleRepository.find({
      where: { enabled: true },
    });

    const matched = rules.filter(r => r.eventType === event.type);

    for (const rule of matched) {
      await this.executeRule(rule, event);
    }
  }

  private async executeRule(rule: Rule, event: any) {
    switch (rule.action) {
      case 'notify_user':
        await this.handleNotifyUser(rule, event);
        break;

      case 'restart_machine':
        await this.handleRestartMachine(rule, event);
        break;

      case 'cancel_booking':
        await this.handleCancelBooking(rule, event);
        break;

      default:
        // custom or unknown action
        break;
    }
  }

  private async handleNotifyUser(rule: Rule, event: any) {
    const userId = rule.params?.userId;
    if (!userId) return;

    await this.notificationsService.create({
      user: { id: userId } as any,
      title: rule.params?.title ?? `Подія: ${event.type}`,
      message: rule.params?.message ?? JSON.stringify(event.payload),
    });
  }

  private async handleRestartMachine(rule: Rule, event: any) {
    const machineId = event.machine?.id;
    if (!machineId) return;

    await this.machinesService.updateStatus(machineId, 'idle');

    await this.eventsService.create({
      machine: event.machine,
      type: 'status',
      payload: { autoRestart: true },
    });
  }

  private async handleCancelBooking(rule: Rule, event: any) {
    // Поки що заглушка — логіка буде додана пізніше
    return;
  }
}
