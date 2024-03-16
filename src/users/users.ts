import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from './users.events';

@Injectable()
export class Users {
  private users = [];

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
    };

    this.users.push(newUser);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserDto.email),
    );
    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(createUserDto.email),
    );

    return newUser;
  }

  all(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (!rolesArray.length)
        throw new NotFoundException('User Role Not Found');
      return rolesArray;
    }

    return this.users;
  }

  getAnalytics() {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }
}
