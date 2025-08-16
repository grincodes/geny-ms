import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UsersRepo } from './repo/users.repo';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);

    const user = await this.usersRepo.save({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    return user;
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    const exists = await this.usersRepo.exists({
      email: createUserDto.email,
    });
    if (exists) {
      throw new UnprocessableEntityException('Email already exists.');
    }
    return exists;
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepo.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepo.findOne(getUserDto);
  }

  async getAllUsers(query) {
    return this.usersRepo.findPaginated(query.size, query.page);
  }
}
