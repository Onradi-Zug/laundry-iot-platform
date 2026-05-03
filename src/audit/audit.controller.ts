import { Controller, Get, Param } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly audit: AuditService) {}

  @Get('tenant/:id')
  getTenantLogs(@Param('id') id: string) {
    return this.audit.findForTenant(id);
  }

  @Get('user/:id')
  getUserLogs(@Param('id') id: string) {
    return this.audit.findForUser(id);
  }
}
