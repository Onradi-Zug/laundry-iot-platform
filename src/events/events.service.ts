import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
  ) {}

  async create(data: Partial<Event>) {
    const e = this.repo.create(data);
    return this.repo.save(e);
  }

  async findByMachine(machineId: string) {
    return this.repo.find({
      where: { machine: { id: machineId } },
      relations: ['machine'],
    });
  }

  async findErrors(): Promise<Event[]> {
    const all = await this.repo.find();
    return all.filter((e: any) => {
      if (e.type && String(e.type).toLowerCase() === 'error') return true;
      if (e.level && String(e.level).toLowerCase() === 'error') return true;
      if (e.status && String(e.status).toLowerCase() === 'error') return true;
      return false;
    });
  }
}
