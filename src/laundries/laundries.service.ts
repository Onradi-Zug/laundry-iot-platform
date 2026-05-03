import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Laundry } from './laundry.entity';

@Injectable()
export class LaundriesService {
  constructor(
    @InjectRepository(Laundry)
    private readonly repo: Repository<Laundry>
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['building', 'machines']
    });
  }

  findByBuilding(buildingId: string) {
    return this.repo.find({
      where: { building: { id: buildingId } },
      relations: ['building', 'machines']
    });
  }

  findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['building', 'machines']
    });
  }

  create(data: Partial<Laundry>) {
    const l = this.repo.create(data);
    return this.repo.save(l);
  }
}
