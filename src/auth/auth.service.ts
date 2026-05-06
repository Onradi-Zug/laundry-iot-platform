import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersRepository.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashed = await bcrypt.hash(dto.password, saltRounds);

    const user = this.usersRepository.create({
      email: dto.email,
      password: hashed,
      role: dto.role || 'user',
    });

    try {
      const saved = await this.usersRepository.save(user);
      const { password, ...result } = saved as any;
      return result;
    } catch (err) {
      if ((err as any)?.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async login(email: string, password: string) {
    // Явно вибираємо password, навіть якщо в сутності стоїть select: false
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'],
    } as any);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const match = await bcrypt.compare(password, (user as any).password || '');
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _p, ...result } = user as any;
    return result;
  }
}
