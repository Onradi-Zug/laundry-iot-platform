import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Tenant } from '../tenants/tenant.entity';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant, (t) => t.id)
  tenant: Tenant;

  @ManyToOne(() => User, (u) => u.id, { nullable: true })
  user: User;

  @Column()
  action: string; // create_machine | update_booking | login | error | etc.

  @Column({ type: 'jsonb', nullable: true })
  details: any;

  @Column({ nullable: true })
  ip: string;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;
}
