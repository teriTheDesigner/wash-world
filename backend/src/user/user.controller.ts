import { User } from '../user.entity';

import {
  Body,
  Controller,
  Post,
  BadRequestException,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signup(@Body() body: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(body.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    return this.userService.create(body);
  }

  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();

    return plainToInstance(User, users);
  }
}
