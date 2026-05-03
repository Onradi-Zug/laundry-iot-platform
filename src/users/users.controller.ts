import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  getMe(@Req() req: any) {
    return this.users.findById(req.user.id);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.users.findById(id);
  }
}
