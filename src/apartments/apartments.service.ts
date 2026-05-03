import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from './apartment.entity';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectRepository(Apartment)
    private readonly repo: Repository<Apartment>
  ) {}

  findByBuilding(buildingId: string) {
    return this.repo.find({
      where: { building: { id: buildingId } },
      relations: ['building']
    });
  }

  create(data: Partial<Apartment>) {
    const a = this.repo.create(data);
    return this.repo.save(a);
  }

  findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['building']
    });
  }
}
