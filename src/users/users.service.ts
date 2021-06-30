import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from './dto/get-user.args';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './dto/user';

@Injectable()
export class UsersService {
  private users: User[] = [];
  constructor() {
    let user: User = new User();
    user.userId = '1';
    user.email = 'p@p.com';
    user.age = 12;
    user.isSubscribed = false;
    this.users.push(user);
    user = new User();
    user.userId = '2';
    user.email = 'p2@p.com';
    user.age = 122;
    user.isSubscribed = true;
    this.users.push(user);
  }

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

  public getUsers() {
    return this.users;
  }
}
