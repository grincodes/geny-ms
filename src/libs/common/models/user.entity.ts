import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/libs/db/BaseEntity';
import { Bookings } from './booking.entity';
import { Role } from '../types/role.enum';

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ enum: Role })
  role: Role;

  @OneToMany(() => Bookings, (booking) => booking.user, {
    cascade: true,
  })
  bookings?: Bookings[];
}
