import { Resolver, Query, ResolveField, Parent, Mutation, Args } from "@nestjs/graphql";
import { User } from './models/user';
import { UsersService } from './users.service';
import { HobbiesService } from './hobbies.service';
import { Hobby } from './models/hobby';
import { CreateUserInput } from "./dto/create-user.input";

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private hobbiesService: HobbiesService,
  ) {}
  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput): User {
    return this.usersService.createUser(createUserData);
  }
  @Query((returns) => [User])
  async users() {
    return this.usersService.getAllUsers();
  }
  @ResolveField()
  async hobbies(@Parent() user: User) {
    return new Hobby();
  }
}
