import { Controller, Get, Param } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartments: ApartmentsService) {}

  @Get(':id')
  getApartment(@Param('id') id: string) {
    return this.apartments.findById(id);
  }
}
