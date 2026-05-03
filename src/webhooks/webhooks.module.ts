import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { Event } from '../events/event.entity';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    // Забезпечує репозиторій Event у контексті WebhooksModule
    TypeOrmModule.forFeature([Event]),
    // Якщо EventsModule експортує EventsService і/або репозиторій — теж імпортуємо
    EventsModule,
  ],
  providers: [WebhooksService],
  controllers: [WebhooksController],
  exports: [WebhooksService],
})
export class WebhooksModule {}
