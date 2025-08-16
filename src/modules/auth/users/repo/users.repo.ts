import { Injectable } from '@nestjs/common';
import { Users } from 'src/libs/common/models';
import { AbstractRepo } from 'src/libs/db/AbstractRepo';

@Injectable()
export class UsersRepo extends AbstractRepo<Users> {
  constructor() {
    super(Users);
  }
}
