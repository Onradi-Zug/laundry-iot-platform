import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly stats: StatisticsService) {}

  @Get('overview')
  getOverview() {
    return this.stats.getOverview();
  }
}
