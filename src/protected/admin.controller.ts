import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Roles('admin')
  @Get('only')
  getAdminOnly(@Req() req: any) {
    return {
      message: 'Admin-only data',
      user: req.user,
    };
  }
}
