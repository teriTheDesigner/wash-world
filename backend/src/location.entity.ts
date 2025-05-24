import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ServiceUnit } from './service-unit.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('decimal', { precision: 10, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitude: number;

  @Column()
  openHours: string;

  @Column()
  maxHeight: string;

  @Column()
  wheelWidth: string;

  @Column()
  mirrorLength: string;

  @Column()
  imageUrl: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  message: string;

  @Column()
  hasAddons: boolean;

  @OneToMany(() => ServiceUnit, (serviceUnit) => serviceUnit.location, {
    cascade: true,
  })
  serviceUnits: ServiceUnit[];
}
