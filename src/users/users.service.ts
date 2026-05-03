import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Tenant } from '../tenants/tenant.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,

    @InjectRepository(Tenant)
    private readonly tenants: Repository<Tenant>,
  ) {}

  async findById(id: string) {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['tenant'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...cleanUser } = user;
    return cleanUser;
  }

  async findByEmailRaw(email: string) {
    const user = await this.repo.findOne({
      where: { email },
      relations: ['tenant'],
    });

    return user || null;
  }

  async createUser(data: Partial<User>) {
    const tenant = await this.tenants.findOne({
      where: { id: '11111111-1111-1111-1111-111111111111' },
    });

    if (!tenant) {
      throw new BadRequestException('Default tenant not found');
    }

    const user = this.repo.create({
      ...data,
      tenant,
    });

    return this.repo.save(user);
  }
}
