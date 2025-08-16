// src/bookings/bookings.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BookingsController } from './booking.controller';
import { BookingsService } from './booking.service';
import { WsBookingGateway } from '../web-socket/ws-booking-gateway/booking.gateway';
import { BookingReminderProcessor } from '../jobs/booking-reminder.processor';
import { BookingsRepo } from './repo/bookings.repo';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'booking-reminders',
    }),
  ],
  providers: [
    BookingsService,
    BookingsRepo,
    WsBookingGateway,
    BookingReminderProcessor,
  ],
  controllers: [BookingsController],
})
export class BookingsModule {}
