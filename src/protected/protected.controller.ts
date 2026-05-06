import { Request } from 'express';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  @UseGuards(JwtAuthGuard)
  @Get('endpoint')
  getEndpoint(@Req() req: Request) {
    return { message: 'Protected data', user: req.user };
  }
}
