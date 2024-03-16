import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { Users } from './users';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMUNICATION',
        transport: Transport.TCP,
      },
      {
        name: 'ANALYTICS',
        transport: Transport.TCP,
        options: { port: 4001 },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [Users],
})
export class UsersModule {}
