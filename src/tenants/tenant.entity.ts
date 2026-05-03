import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Machine } from '../machines/machine.entity';
import { Building } from '../buildings/building.entity';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (u) => u.tenant)
  users: User[];

  @OneToMany(() => Machine, (m) => m.tenant)
  machines: Machine[];

  @OneToMany(() => Building, (b) => b.tenant)
  buildings: Building[];
}
