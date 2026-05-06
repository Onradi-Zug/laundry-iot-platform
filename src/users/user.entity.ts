import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Tenant } from '../tenants/tenant.entity';
import { Booking } from '../bookings/booking.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  role: string;

  @ManyToOne(() => Tenant, (t) => t.users, { nullable: true, onDelete: 'SET NULL' })
  tenant: Tenant;

  @OneToMany(() => Booking, (b) => b.user)
  bookings: Booking[];
}
