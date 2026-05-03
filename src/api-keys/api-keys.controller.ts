import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';

@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeys: ApiKeysService) {}

  @Post()
  createKey(
    @Body()
    body: {
      tenantId: string;
      name: string;
      permissions: any;
    }
  ) {
    return this.apiKeys.create(body.tenantId, body.name, body.permissions);
  }

  @Get('tenant/:id')
  getTenantKeys(@Param('id') id: string) {
    return this.apiKeys.findForTenant(id);
  }

  @Post(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.apiKeys.deactivate(id);
  }
}
