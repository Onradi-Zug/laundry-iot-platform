import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Machine } from './machine.entity';
import { EventsService } from '../events/events.service';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private readonly repo: Repository<Machine>,
    private readonly eventsService: EventsService,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  findByLaundry(laundryId: string) {
    return this.repo.find({ where: { laundryId } });
  }

  // ============================
  // CHECK AVAILABILITY
  // ============================
  async ensureAvailable(id: string) {
    const machine = await this.findById(id);
    if (!machine) throw new BadRequestException('Machine not found');

    if (machine.status === 'error') {
      throw new BadRequestException('Machine is in error state');
    }

    if (machine.status === 'running') {
      throw new BadRequestException('Machine is currently running');
    }

    if (machine.status === 'busy') {
      throw new BadRequestException('Machine is already booked');
    }

    return machine;
  }

  // ============================
  // UPDATE STATUS + EVENT
  // ============================
  async updateStatus(
    id: string,
    status: 'idle' | 'busy' | 'running' | 'error',
  ) {
    const machine = await this.findById(id);
    if (!machine) throw new BadRequestException('Machine not found');

    const oldStatus = machine.status;

    await this.repo.update(id, { status, lastEventAt: new Date() });
    const updated = await this.findById(id);

    // Подія machine_status_changed
    await this.eventsService.create({
      machine: { id },
      type: 'machine_status_changed',
      payload: {
        machineId: id,
        oldStatus,
        newStatus: status,
      },
    });

    return updated;
  }

  // ============================
  // FIND STUCK MACHINES
  // ============================
  async findStuckMachines(timeoutSeconds: number) {
    const threshold = new Date(Date.now() - timeoutSeconds * 1000);
    return this.repo.find({
      where: {
        status: 'running',
        lastEventAt: LessThan(threshold),
      },
    });
  }

  // ============================
  // CREATE MACHINE
  // ============================
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
