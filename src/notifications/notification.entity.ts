import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (u) => u.id)
  user: User;

  @Column()
  type: string; // machine_finished | machine_error | booking_reminder | custom

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  payload: any;

  @Column({ default: false })
  read: boolean;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;
}
