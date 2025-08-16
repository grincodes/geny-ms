import { Test, TestingModule } from '@nestjs/testing';

import { getQueueToken } from '@nestjs/bull';
import { WsBookingGateway } from '../web-socket/ws-booking-gateway/booking.gateway';
import { BookingsService } from './booking.service';
import { ServiceType } from 'src/libs/common/dto/booking.dto';
import { v4 as uuid } from 'uuid';

describe('BookingsService', () => {
  let service: BookingsService;
  let gateway: WsBookingGateway;
  let userId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: getQueueToken('booking-reminders'),
          useValue: { add: jest.fn() },
        },
        {
          provide: WsBookingGateway,
          useValue: {
            emitBookingCreated: jest.fn(),
            server: { emit: jest.fn() },
          },
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    gateway = module.get<WsBookingGateway>(WsBookingGateway);
    userId = uuid(); // Mock user ID for testing
  });

  it('should emit creation event', async () => {
    const booking = {
      startsAt: new Date(Date.now() + 3600000).toISOString(),
      clientName: 'John',
      clientPhone: '+2349090654523',
      service: ServiceType.HAIRCUT,
    };
    await service.createBooking(userId, booking);
    expect(gateway.emitBookingCreated).toHaveBeenCalled();
  });
});
