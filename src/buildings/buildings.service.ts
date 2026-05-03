import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './building.entity';
import { Tenant } from '../tenants/tenant.entity';
import { CreateBuildingDto } from './dto/create-building.dto';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private repo: Repository<Building>,

    @InjectRepository(Tenant)
    private tenants: Repository<Tenant>,
  ) {}

  async create(dto: CreateBuildingDto) {
    const tenant = await this.tenants.findOne({
      where: { id: dto.tenantId },
    });

    if (!tenant) {
      throw new Error('Tenant not found');
    }

    const building = this.repo.create({
      name: dto.name,
      tenant,
    });

    return this.repo.save(building);
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['tenant', 'laundries', 'apartments'],
    });
  }
}
