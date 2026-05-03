import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../events/event.entity';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async handlePayrexx(body: any) {
    const event = this.eventRepository.create({ type: 'payrexx', payload: body, createdAt: new Date() } as any);
    return this.eventRepository.save(event);
  }

  async handleStripe(body: any) {
    const event = this.eventRepository.create({ type: 'stripe', payload: body, createdAt: new Date() } as any);
    return this.eventRepository.save(event);
  }

  async handleGeneric(body: any) {
    const event = this.eventRepository.create({ type: body?.type || 'generic', payload: body, createdAt: new Date() } as any);
    return this.eventRepository.save(event);
  }
}
