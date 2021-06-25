import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from './dto/get-user.args';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './dto/user';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      userId: uuidv4(),
      ...createUserData,
    };

    this.users.push(user);

    return user;
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.userId === getUserArgs.userId);
  }
}
