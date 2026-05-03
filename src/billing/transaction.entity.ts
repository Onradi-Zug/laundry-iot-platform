import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Booking } from '../bookings/booking.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Booking, (b) => b.id, { onDelete: 'CASCADE' })
  booking: Booking;

  @Column()
  amount: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'paid' | 'failed';

  @Column({ type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;
}
