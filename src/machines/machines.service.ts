import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Machine } from './machine.entity';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private readonly repo: Repository<Machine>,
  ) {}

  // === ДОДАНО ДЛЯ RECOVERY ===
  findAll() {
    return this.repo.find();
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  findByLaundry(laundryId: string) {
    return this.repo.find({ where: { laundryId } });
  }

  async updateStatus(id: string, status: 'idle' | 'running' | 'error') {
    await this.repo.update(id, { status, lastEventAt: new Date() });
    return this.findById(id);
  }

  async findStuckMachines(timeoutSeconds: number) {
    const threshold = new Date(Date.now() - timeoutSeconds * 1000);
    return this.repo.find({
      where: {
        status: 'running',
        lastEventAt: LessThan(threshold),
      },
    });
  }

  create(data: {
    name: string;
    type: string;
    laundryId: string;
  }) {
    const machine = this.repo.create({
      name: data.name,
      type: data.type,
      laundryId: data.laundryId,
      status: 'idle',
      lastEventAt: null,
    });

    return this.repo.save(machine);
  }
}
