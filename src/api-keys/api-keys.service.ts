import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from './api-key.entity';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeysService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly repo: Repository<ApiKey>
  ) {}

  generateKey() {
    return crypto.randomBytes(32).toString('hex');
  }

  async create(tenantId: string, name: string, permissions: any) {
    const rawKey = this.generateKey();
    const hashed = crypto.createHash('sha256').update(rawKey).digest('hex');

    const key = this.repo.create({
      tenant: { id: tenantId } as any,
      name,
      key: hashed,
      permissions
    });

    await this.repo.save(key);

    return {
      id: key.id,
      apiKey: rawKey // показуємо лише один раз
    };
  }

  async validate(key: string) {
    const hashed = crypto.createHash('sha256').update(key).digest('hex');

    return this.repo.findOne({
      where: { key: hashed, active: true },
      relations: ['tenant']
    });
  }

  findForTenant(tenantId: string) {
    return this.repo.find({
      where: { tenant: { id: tenantId } }
    });
  }

  deactivate(id: string) {
    return this.repo.update(id, { active: false });
  }
}
