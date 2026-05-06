import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { OptionalJwtGuard } from '../auth/optional-jwt.guard';

@Controller('protected')
export class ProtectedController {
  @UseGuards(OptionalJwtGuard)
  @Get('endpoint')
  getEndpoint(@Req() req: any) {
    return { message: 'Protected data', user: req.user || null };
  }
}
