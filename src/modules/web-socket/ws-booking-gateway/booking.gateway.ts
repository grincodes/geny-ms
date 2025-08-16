import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class WsBookingGateway {
  @WebSocketServer()
  server: Server;

  emitBookingCreated(payload: any) {
    this.server.emit('booking.created', payload);
  }

  emitBookingReminder(payload: any) {
    this.server.emit('booking.reminder', payload);
  }
}
