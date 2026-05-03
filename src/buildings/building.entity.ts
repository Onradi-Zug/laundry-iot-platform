import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import { Laundry } from '../laundries/laundry.entity';
import { Apartment } from '../apartments/apartment.entity';

@Entity('buildings')
export class Building {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Tenant, (t) => t.buildings, { eager: true })
  tenant: Tenant;

  @OneToMany(() => Laundry, (l) => l.building)
  laundries: Laundry[];

  @OneToMany(() => Apartment, (a) => a.building)
  apartments: Apartment[];
}
