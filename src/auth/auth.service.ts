import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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
}
