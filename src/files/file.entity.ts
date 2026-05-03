import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import { User } from '../users/user.entity';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant, (t) => t.id, { nullable: true })
  tenant: Tenant;

  @ManyToOne(() => User, (u) => u.id, { nullable: true })
  user: User;

  @Column()
  originalName: string;

  @Column()
  filename: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;
}
