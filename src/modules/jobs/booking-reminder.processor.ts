import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { WsBookingGateway } from '../web-socket/ws-booking-gateway/booking.gateway';

@Processor('booking-reminders')
export class BookingReminderProcessor {
  constructor(private bookingGateway: WsBookingGateway) {}

  @Process()
  async handleReminder(job: Job) {
    const booking = job.data;
    this.bookingGateway.server.emit('bookingReminder', booking);
  }
}
