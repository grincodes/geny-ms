import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
  Matches,
  IsEnum,
  IsISO8601,
  MaxLength,
} from 'class-validator';

import { MinLeadTime } from 'src/libs/common/decorators/custom-validators/minLeadTime';
import { ServiceType } from 'src/libs/common/dto/booking.dto';

export class CreateBookingDto {
  @ApiProperty()
  @IsString()
  @Length(2, 80)
  clientName: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'clientPhone must be in E.164 format',
  })
  clientPhone: string;

  @ApiProperty()
  @IsEnum(ServiceType)
  service: ServiceType;

  @ApiProperty()
  @IsISO8601(
    {},
    { message: 'startsAt must be a valid ISO 8601 datetime string' },
  )
  @MinLeadTime(15, { message: 'startsAt must be at least 15 minutes from now' })
  startsAt: string;

  @ApiProperty()
  @IsString()
  @MaxLength(280)
  notes?: string;
}
