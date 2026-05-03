import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Post('rules')
  createRule(@Body() body: any) {
    const rulesSvc: any = (this.admin as any).rules;
    if (rulesSvc && typeof rulesSvc.create === 'function') {
      return rulesSvc.create(body);
    }
    return { ok: true, data: body };
  }

  @Get('rules/:id')
  getRule(@Param('id') id: string) {
    const rulesSvc: any = (this.admin as any).rules;
    if (rulesSvc && typeof rulesSvc.findOne === 'function') {
      return rulesSvc.findOne(id);
    }
    return { id, message: 'not implemented' };
  }
}
