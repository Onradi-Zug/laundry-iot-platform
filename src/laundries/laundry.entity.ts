import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Building } from '../buildings/building.entity';
import { Machine } from '../machines/machine.entity';

@Entity()
export class Laundry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // Foreign key column
  @Column()
  buildingId: string;

  @ManyToOne(() => Building, building => building.laundries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'buildingId' })
  building: Building;

  @OneToMany(() => Machine, machine => machine.laundry)
  machines: Machine[];
}
