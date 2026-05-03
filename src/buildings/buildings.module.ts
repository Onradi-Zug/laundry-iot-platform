import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingsController } from './buildings.controller';
import { BuildingsService } from './buildings.service';
import { Building } from './building.entity';
import { Tenant } from '../tenants/tenant.entity';
import { Laundry } from '../laundries/laundry.entity';
import { Apartment } from '../apartments/apartment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Building, Tenant, Laundry, Apartment])],
  controllers: [BuildingsController],
  providers: [BuildingsService],
  exports: [BuildingsService],
})
export class BuildingsModule {}
