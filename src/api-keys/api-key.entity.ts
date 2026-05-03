import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';

@Entity('api_keys')
export class ApiKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant, (t) => t.id)
  tenant: Tenant;

  @Column()
  name: string;

  @Column()
  key: string; // зберігається у хешованому вигляді

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'jsonb', nullable: true })
  permissions: any; // наприклад: { machines: true, bookings: false }

  @Column({ type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;
}
