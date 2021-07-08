import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from './dto/get-user.args';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './models/user';
import { Hobby } from './models/hobby';

@Injectable()
export class HobbiesService {
  private hobbies: Hobby[];
  constructor() {
    this.hobbies = Array<Hobby>();
  }
  /*
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
  */
  public getAllHobbies(): Hobby[] {
    return this.hobbies;
  }
  /*
  updateUser(id: string, input1: User) {
    return Promise.resolve(undefined);
  }

  delete(id: string) {
    return Promise.resolve(undefined);
  }

   */
}
