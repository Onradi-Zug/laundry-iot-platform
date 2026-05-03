import { Controller, Get } from '@nestjs/common';
import { RecoveryService } from './recovery.service';

@Controller('recovery')
export class RecoveryController {
  constructor(private readonly recoveryService: RecoveryService) {}

  @Get('check')
  check() {
    return this.recoveryService.checkMachines();
  }
}
