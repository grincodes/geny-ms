import { Injectable } from '@nestjs/common';
import { Bookings } from 'src/libs/common/models';

import { AbstractRepo } from 'src/libs/db/AbstractRepo';

@Injectable()
export class BookingsRepo extends AbstractRepo<Bookings> {
  constructor() {
    super(Bookings);
  }
}
