import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { BaseEntity } from 'src/libs/db/BaseEntity';
import { ServiceType } from '../dto/booking.dto';
import { Users } from './user.entity';

@Entity('bookings')
export class Bookings extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  clientName: string;

  @Column()
  clientPhone: string;

  @Column({ type: 'enum', enum: ServiceType })
  service: ServiceType;

  @Column({ type: 'timestamptz' })
  startsAt!: Date;

  @Column()
  notes?: string;

  @Column()
  userId: string;

  @ManyToOne(() => Users, (user) => user.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: Users;
}
