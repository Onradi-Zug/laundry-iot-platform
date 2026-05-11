import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { RulesService } from '../rules/rules.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
    private readonly rulesService: RulesService,
  ) {}

  // ============================
  // CREATE EVENT
  // ============================
  async create(data: {
    machine?: { id: string };
    type: string;
    payload?: any;
    level?: string;
    status?: string;
  }) {
    const e = this.repo.create({
      machine: data.machine as any,
      type: data.type,
      payload: data.payload ?? {},
      level: data.level ?? null,
      status: data.status ?? null,
    });

    const saved = await this.repo.save(e);

    // Rule Engine
    await this.rulesService.onEvent(saved);

    return saved;
  }

  // ============================
  // FIND EVENTS BY MACHINE
  // ============================
  async findByMachine(machineId: string) {
    return this.repo.find({
      where: { machine: { id: machineId } },
      order: { createdAt: 'DESC' },
      relations: ['machine'],
    });
  }

  // ============================
  // FIND ERROR EVENTS
  // ============================
  async findErrors(): Promise<Event[]> {
    const all = await this.repo.find();
    return all.filter((e: any) => {
      if (e.type?.toLowerCase() === 'error') return true;
      if (e.level