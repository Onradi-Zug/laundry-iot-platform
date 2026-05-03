// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import { Booking } from '../bookings/booking.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  role: string;

  @ManyToOne(() => Tenant, (t) => t.users, { nullable: true, onDelete: 'SET NULL' })
  tenant: Tenant;

  @OneToMany(() => Booking, (b) => b.user)
  bookings: Booking[];
}
