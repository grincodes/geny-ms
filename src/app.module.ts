import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './libs/db/DatabaseModule';
import { HealthModule } from './modules/health';
import { LoggerModule } from './libs/common/logger';
import { AuthModule } from './modules/auth/auth.module';
import { BullModule } from '@nestjs/bullmq';
import { Config } from './config';
import { BookingsModule } from './modules/booking/booking.module';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    HealthModule,
    AuthModule,
    BookingsModule,
    BullModule.forRoot({
      connection: {
        host: Config.REDIS_HOST,
        port: Config.REDIS_PORT,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
