import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from './rule.entity';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { EventsModule } from '../events/events.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { MachinesModule } from '../machines/machines.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rule]),
    forwardRef(() => EventsModule),
    NotificationsModule,
    MachinesModule,
  ],
  providers: [RulesService],
  controllers: [RulesController],
  exports: [RulesService],
})
export class RulesModule {}
