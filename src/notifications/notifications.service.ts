import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly repo: Repository<Notification>
  ) {}

  create(data: Partial<Notification>) {
    const n = this.repo.create(data);
    return this.repo.save(n);
  }

  findForUser(userId: string) {
    return this.repo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }
    });
  }

  markRead(id: string) {
    return this.repo.update(id, { read: true });
  }
}
