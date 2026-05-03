import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.users.findByEmailRaw(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload = {
      sub: user.id,
      tenantId: user.tenant.id,
      role: user.role,
    };

    return {
      accessToken: this.jwt.sign(payload),
    };
  }

  async register(email: string, password: string, role: string) {
    const existing = await this.users.findByEmailRaw(email);
    if (existing) {
      throw new BadRequestException('User already exists');
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.users.createUser({
      email,
      password: hashed,
      role,
    });

    const payload = {
      sub: user.id,
      tenantId: user.tenant.id,
      role: user.role,
    };

    return {
      accessToken: this.jwt.sign(payload),
    };
  }
}
