import { Module } from '@nestjs/common';
import { RecoveryService } from './recovery.service';
import { RecoveryController } from './recovery.controller';
import { MachinesModule } from '../machines/machines.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [MachinesModule, EventsModule],
  providers: [RecoveryService],
  controllers: [RecoveryController],
})
export class RecoveryModule {}
