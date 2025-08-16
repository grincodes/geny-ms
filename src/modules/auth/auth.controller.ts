import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from 'src/libs/common/decorators/current-user.decorator';
import { Users } from 'src/libs/common/models';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './users/dto/login.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @CurrentUser() user: Users,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.login(user, response);
    response.send({
      token: jwt,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticate(@Req() req: RequestWithUser) {
    return req.user;
  }
}
