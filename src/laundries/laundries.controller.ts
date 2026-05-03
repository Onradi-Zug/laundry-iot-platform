import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { LaundriesService } from './laundries.service';

@Controller('laundries')
export class LaundriesController {
  constructor(private readonly laundries: LaundriesService) {}

  @Get()
  findAll() {
    return this.laundries.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.laundries.findById(id);
  }

  @Post()
  create(@Body() body: { name: string; buildingId: string }) {
    return this.laundries.create({
      name: body.name,
      buildingId: body.buildingId,
    });
  }
}
