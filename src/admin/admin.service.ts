import { Injectable } from '@nestjs/common';

import { TenantsService } from '../tenants/tenants.service';
import { UsersService } from '../users/users.service';
import { BuildingsService } from '../buildings/buildings.service';
import { ApartmentsService } from '../apartments/apartments.service';
import { LaundriesService } from '../laundries/laundries.service';
import { MachinesService } from '../machines/machines.service';
import { BillingService } from '../billing/billing.service';
import { RulesService } from '../rules/rules.service';

@Injectable()
export class AdminService {
  constructor(
    public tenants: TenantsService,
    public users: UsersService,
    public buildings: BuildingsService,
    public apartments: ApartmentsService,
    public laundries: LaundriesService,
    public machines: MachinesService,
    public billing: BillingService,
    public rules: RulesService
  ) {}
}
