import { Global, Module } from '@nestjs/common';
import { WsBookingGateway } from './ws-booking-gateway/booking.gateway';

@Global()
@Module({
  imports: [],
  providers: [WsBookingGateway],
})
export class WsModule {}
