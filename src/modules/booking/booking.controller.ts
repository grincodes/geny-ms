import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from 'src/libs/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BookingsService } from './booking.service';
import { WsBookingGateway } from '../web-socket/ws-booking-gateway/booking.gateway';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Roles } from 'src/libs/common/decorators/roles.decorator';
import { Role } from 'src/libs/common/types/role.enum';
import { RoleGuard } from '../auth/guards/role.guard';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('bookings')
@Controller('v1/bookings')
export class BookingsController {
  constructor(
    private readonly bookingService: BookingsService,
    @InjectQueue('booking-reminders') private reminderQueue: Queue,
    private bookingGateway: WsBookingGateway,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  async create(@Body() dto: CreateBookingDto, @CurrentUser() user: any) {
    const booking = await this.bookingService.createBooking(user.id, dto);

    this.bookingGateway.emitBookingCreated(booking);

    const delay =
      new Date(booking.startsAt).getTime() - Date.now() - 10 * 60 * 1000;
    if (delay > 0) {
      await this.reminderQueue.add('reminder', booking, { delay });
    }

    return booking;
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.bookingService.get(id);
  }

  @Get()
  async list(@Query() query) {
    return query?.filter === 'past'
      ? this.bookingService.listPast(query)
      : this.bookingService.listUpcoming(query);
  }
}
