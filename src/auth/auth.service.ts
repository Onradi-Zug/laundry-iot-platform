import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async register(dto: RegisterDto) {
    // перевірка наявності перед збереженням
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
      // не повертати пароль у відповіді
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = saved as any;
      return result;
    } catch (err) {
      // додаткова перевірка на випадок гонки записів
      if ((err as any)?.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  // інші методи (login тощо) залишаються без змін
}
