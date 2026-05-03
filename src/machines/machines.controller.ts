import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MachinesService } from './machines.service';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machines: MachinesService) {}

  @Get(':id')
  getMachine(@Param('id') id: string) {
    return this.machines.findById(id);
  }

  @Post()
  createMachine(
    @Body()
    body: {
      name: string;
      type: string;
      laundryId: string;
    },
  ) {
    return this.machines.create({
      name: body.name,
      type: body.type,
      laundryId: body.laundryId,
    });
  }
}
