import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';

@Entity('rules')
export class Rule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant, (t) => t.id)
  tenant: Tenant;

  @Column()
  eventType: string; // start | finish | error | status | custom

  @Column()
  action: string; // notify_user | restart_machine | cancel_booking | custom

  @Column({ type: 'jsonb', nullable: true })
  conditions: any;

  @Column({ type: 'jsonb', nullable: true })
  params: any;

  @Column({ default: true })
  enabled: boolean;
}
