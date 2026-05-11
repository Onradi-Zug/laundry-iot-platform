import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { TenantsService } from '../tenants/tenants.service';
import { BuildingsService } from '../buildings/buildings.service';
import { LaundriesService } from '../laundries/laundries.service';
import { MachinesService } from '../machines/machines.service';
import { RulesService } from '../rules/rules.service';
import { EventsService } from '../events/events.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const users = app.get(UsersService);
  const tenants = app.get(TenantsService);
  const buildings = app.get(BuildingsService);
  const laundries = app.get(LaundriesService);
  const machines = app.get(MachinesService);
  const rules = app.get(RulesService);
  const events = app.get(EventsService);

  console.log('🌱 Starting seed...');

  // 1. Admin user
  let admin = await users.findByEmail('admin@example.com');
  if (!admin) {
    admin = await users.createUser({
      email: 'admin@example.com',
      password: 'admin',
      role: 'admin',
    });
    console.log('✔ Admin created');
  } else {
    console.log('✔ Admin already exists');
  }

  // 2. Tenant
  const tenant = await tenants.create({
    name: 'Test Tenant',
  });
  console.log('✔ Tenant created');

  // 3. Building (без address, бо його немає в DTO)
  const building = await buildings.create({
    tenantId: tenant.id,
    name: 'Building A',
  });
  console.log('✔ Building created');

  // 4. Laundry
  const laundry = await laundries.create({
    buildingId: building.id,
    name: 'Main Laundry',
  });
  console.log('✔ Laundry created');

  // 5. Machine (без model, бо його немає в DTO)
  const machine = await machines.create({
    laundryId: laundry.id,
    type: 'washer',
    name: 'Washer #1',
  });
  console.log('✔ Machine created');

  // 6. Rules
  await rules.create({
    tenantId: tenant.id,
    name: 'Default rule',
    maxBookingsPerUser: 3,
    maxBookingDurationMinutes: 120,
  });
  console.log('✔ Rules created');

  // 7. Events (machine, а не machineId)
  await events.create({
    machine,
    type: 'status_change',
    payload: { from: 'idle', to: 'running' },
  });
  console.log('✔ Event created');

  console.log('🌱 Seed completed successfully');
  await app.close();
}

bootstrap();
