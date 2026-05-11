import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { RulesModule } from '../rules/rules.module';
import { MachinesModule } from '../machines/machines.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    forwardRef(() => RulesModule),
    MachinesModule,
  ],
  providers: [EventsService],
  controllers: [EventsController],
  exports: [EventsService],
})
export class EventsModule {}
