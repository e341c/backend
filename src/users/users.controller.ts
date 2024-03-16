import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Users } from './users';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: Users) {}

  @Get()
  all(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.users.all(role);
  }

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.users.create(createUserDto);
  }

  @Get('analytics')
  getAnalytics() {
    return this.users.getAnalytics();
  }
}
