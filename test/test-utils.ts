import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';

export function getTestToken(role: 'provider' | 'admin' = 'provider') {
  const jwtService = new JwtService({
    secret: process.env.JWT_SECRET || 'test-secret',
  });

  return jwtService.sign({
    userId: uuid(), // auto-generated unique ID
    role,
  });
}
