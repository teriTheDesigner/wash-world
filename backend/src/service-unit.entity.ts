import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Location } from './location.entity';

@Entity()
export class ServiceUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // e.g. 'hall', 'self_wash'

  @Column('int')
  totalCount: number;

  @Column({ nullable: true })
  machineType: string;

  @ManyToOne(() => Location, (location) => location.serviceUnits, {
    onDelete: 'CASCADE',
  })
  location: Location;
}
