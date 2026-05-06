import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async validateUserByEmail(email: string, plainPassword: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const matches = await bcrypt.compare(plainPassword, (user as any).password);
    if (!matches) throw new UnauthorizedException('Invalid credentials');
    delete (user as any).password;
    return user;
  }

  async login(email: string, password: string) {
    return this.validateUserByEmail(email, password);
  }

  async register(email: string, plainPassword: string, role: string) {
    const hashed = await bcrypt.hash(plainPassword, 10);
    const user = this.userRepository.create({ email, password: hashed, role });
    await this.userRepository.save(user);
    delete (user as any).password;
    return user;
  }
}
