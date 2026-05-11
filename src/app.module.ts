import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProtectedModule } from './protected/protected.module';

import { MachinesModule } from './machines/machines.module';
import { TenantsModule } from './tenants/tenants.module';
import { BuildingsModule } from './buildings/buildings.module';
import { LaundriesModule } from './laundries/laundries.module';
import { BookingsModule } from './bookings/bookings.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'laundry',
      autoLoadEntities: true,
      synchronize: true,
    }),

    AuthModule,
    UsersModule,
    ProtectedModule,

    MachinesModule,
    TenantsModule,
    BuildingsModule,
    LaundriesModule,
    BookingsModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
