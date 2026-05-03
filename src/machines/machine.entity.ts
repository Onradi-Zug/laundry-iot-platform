import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Laundry } from '../laundries/laundry.entity';
import { Tenant } from '../tenants/tenant.entity';
import { Booking } from '../bookings/booking.entity';
import { Event } from '../events/event.entity';

@Entity('machines')
export class Machine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ default: 'idle' })
  status: 'idle' | 'running' | 'error';

  @Column()
  laundryId: string;

  @ManyToOne(() => Laundry, (laundry) => laundry.machines, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'laundryId' })
  laundry: Laundry;

  @Column({ nullable: true })
  tenantId: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.machines, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @OneToMany(() => Booking, (booking) => booking.machine)
  bookings: Booking[];

  @OneToMany(() => Event, (event) => event.machine)
  events: Event[];

  @Column({ type: 'timestamptz', nullable: true })
  lastEventAt: Date | null;
}
