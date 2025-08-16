import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getTestToken } from './test-utils';
import { ServiceType } from 'src/libs/common/dto/booking.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/bookings (POST) creates booking with JWT auth', async () => {
    const token = getTestToken('provider');

    const res = await request(app.getHttpServer())
      .post('/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        startsAt: new Date(Date.now() + 3600000).toISOString(),
        clientName: 'John',
        clientPhone: '+2349090654523',
        service: ServiceType.HAIRCUT,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.clientName).toBe('John');
  });
});
