import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { MachinesModule } from '../machines/machines.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    MachinesModule,
    EventsModule,
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
