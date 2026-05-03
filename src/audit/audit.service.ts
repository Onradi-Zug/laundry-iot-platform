import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly repo: Repository<AuditLog>
  ) {}

  log(data: Partial<AuditLog>) {
    const entry = this.repo.create(data);
    return this.repo.save(entry);
  }

  findForTenant(tenantId: string, limit = 100) {
    return this.repo.find({
      where: { tenant: { id: tenantId } },
      order: { createdAt: 'DESC' },
      take: limit
    });
  }

  findForUser(userId: string, limit = 100) {
    return this.repo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      take: limit
    });
  }
}
