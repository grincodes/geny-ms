import { Injectable } from '@nestjs/common';
import { BookingsRepo } from './repo/bookings.repo';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Bookings } from 'src/libs/common/models';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { GrpcMethod } from '@nestjs/microservices';

@Injectable()
export class BookingsService {
  constructor(
    @InjectQueue('booking-reminders') private reminderQueue: Queue,
    private readonly bookingsRepo: BookingsRepo,
  ) {}

  async createBooking(
    userId: string,
    bookingData: CreateBookingDto,
  ): Promise<Bookings> {
    return this.bookingsRepo.save({
      userId,
      startsAt: new Date(bookingData.startsAt),
      clientName: bookingData.clientName,
      clientPhone: bookingData.clientPhone,
      service: bookingData.service,
      notes: bookingData.notes,
    });
  }

  @GrpcMethod('BookingService', 'CreateBooking')
  async createBookingGrpc(data) {
    const booking = await this.createBooking(data.userId, data);
    return {
      id: booking.id,
      clientName: booking.clientName,
      clientPhone: booking.clientPhone,
      service: booking.service,
      startsAt: booking.startsAt.toISOString(),
      notes: booking.notes ?? '',
      createdAt: booking.createdAt.toISOString(),
    };
  }

  async get(id: string) {
    return await this.bookingsRepo.findOne({ id });
  }

  async listUpcoming(query: { size: number; page: number }) {
    return await this.bookingsRepo.findPaginated(
      query.size,
      query.page,
      { startsAt: MoreThanOrEqual(new Date()) },
      { startsAt: 'ASC' },
    );
  }

  async listPast(query: { size: number; page: number }) {
    return await this.bookingsRepo.findPaginated(
      query.size,
      query.page,
      { startsAt: LessThanOrEqual(new Date()) },
      { startsAt: 'DESC' },
    );
  }
}
