import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { TenantsModule } from '../tenants/tenants.module';
import { UsersModule } from '../users/users.module';
import { BuildingsModule } from '../buildings/buildings.module';
import { ApartmentsModule } from '../apartments/apartments.module';
import { LaundriesModule } from '../laundries/laundries.module';
import { MachinesModule } from '../machines/machines.module';
import { BillingModule } from '../billing/billing.module';
import { RulesModule } from '../rules/rules.module';

@Module({
  imports: [
    TenantsModule,
    UsersModule,
    BuildingsModule,
    ApartmentsModule,
    LaundriesModule,
    MachinesModule,
    BillingModule,
    RulesModule
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
