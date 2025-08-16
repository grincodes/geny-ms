import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';
import { Users } from 'src/libs/common/models';
import { Config } from 'src/config';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: Users, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const expiresIn = `${Config.JWT_EXPIRATION}s`;

    const token = this.jwtService.sign(tokenPayload, { expiresIn });

    return token;
  }
}
