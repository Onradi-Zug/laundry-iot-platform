import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Machine } from '../machines/machine.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Machine, (m) => m.events, { onDelete: 'CASCADE' })
  machine: Machine;

  @Column()
  type: string; // start | finish | error | status | custom

  @Column({ type: 'jsonb', nullable: true })
  payload: any;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;
}
