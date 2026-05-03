import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';

@Entity('tariffs')
export class Tariff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant, (t) => t.id)
  tenant: Tenant;

  @Column()
  name: string;

  @Column({ nullable: true })
  pricePerCycle: number;

  @Column({ nullable: true })
  pricePerMinute: number;

  @Column({ default: true })
  active: boolean;
}
