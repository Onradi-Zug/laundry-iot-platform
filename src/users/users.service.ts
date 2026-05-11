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

  // -----------------------------
  // FIND BY ID (clean, no password)
  // -----------------------------
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

  // -----------------------------
  // FIND BY EMAIL (WITH PASSWORD)
  // -----------------------------
  async findByEmail(email: string) {
    return this.repo.findOne({
      where: { email },
      relations: ['tenant'],
      select: ['id', 'email', 'password', 'role'],
    });
  }

  // Raw version (kept for compatibility)
  async findByEmailRaw(email: string) {
    return this.repo.findOne({
      where: { email },
      relations: ['tenant'],
    });
  }

  // -----------------------------
  // CREATE USER (used by seed)
  // -----------------------------
  async create(data: Partial<User>) {
    let tenant: Tenant | null = null;

    // If tenant is provided — use it
    if (data.tenant) {
      tenant = data.tenant;
    } else {
      // Otherwise use default tenant
      tenant = await this.tenants.findOne({
        where: { id: '11111111-1111-1111-1111-111111111111' },
      });

      if (!tenant) {
        throw new BadRequestException('Default tenant not found');
      }
    }

    const user = this.repo.create({
      ...data,
      tenant,
    });

    return this.repo.save(user);
  }

  // Alias for compatibility with older code
  async createUser(data: Partial<User>) {
    return this.create(data);
  }
}
