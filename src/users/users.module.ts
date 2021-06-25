import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { HobbiesService } from './hobbies.service';

@Module({
  providers: [UsersService, UsersResolver, HobbiesService],
})
export class UsersModule {}
