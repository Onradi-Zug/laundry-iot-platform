import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RulesService } from './rules.service';

@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Post()
  create(@Body() body: any) {
    if ((this.rulesService as any).create) {
      return (this.rulesService as any).create(body);
    }
    return { ok: true, data: body };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if ((this.rulesService as any).findOne) {
      return (this.rulesService as any).findOne(id);
    }
    return { id, message: 'not implemented' };
  }

  @Get()
  findAll() {
    if ((this.rulesService as any).findAll) {
      return (this.rulesService as any).findAll();
    }
    return [];
  }
}
