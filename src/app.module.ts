import { ProtectedModule } from './protected/protected.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachinesModule } from './machines/machines.module';
import { EventsModule } from './events/events.module';
import { RecoveryModule } from './recovery/recovery.module';
import { BookingsModule } from './bookings/bookings.module';
import { UsersModule } from './users/users.module';
import { BuildingsModule } from './buildings/buildings.module';
import { AuthModule } from './auth/auth.module';

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
    ProtectedModule,
    AuthModule,
    UsersModule,
    BookingsModule,
    BuildingsModule,
    MachinesModule,
    EventsModule,
    RecoveryModule,
  ],
})
export class AppModule {}
