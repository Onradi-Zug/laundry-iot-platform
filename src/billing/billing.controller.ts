import { Controller, Get, Param } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billing: BillingService) {}

  @Get('tariff/:tenantId')
  getTariff(@Param('tenantId') tenantId: string) {
    return this.billing.getActiveTariff(tenantId);
  }

  @Get('transaction/:id')
  getTransaction(@Param('id') id: string) {
    return this.billing['transactions'].findOne({ where: { id } });
  }
}
