import { Module } from '@nestjs/common';
import { ProtectedController } from './protected.controller';
import { AdminController } from './admin.controller';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule, // ← критично важливо
  ],
  controllers: [
    ProtectedController,
    AdminController,
  ],
})
export class ProtectedModule {}
