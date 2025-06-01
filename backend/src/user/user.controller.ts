import { User } from '../user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

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

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Email already registered.' })
  async signup(@Body() body: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(body.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    return this.userService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();

    return plainToInstance(User, users);
  }
}
