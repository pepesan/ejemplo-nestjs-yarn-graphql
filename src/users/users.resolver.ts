import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GetUserArgs } from './dto/get-user.args';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './dto/user';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  /*
    Ejemplo de Consula:
    query{
      getUsers{
        userId, email
      }
    }
   */

  @Query((type) => [User])
  async getUsers() {
    return this.usersService.getUsers();
  }
  /*
    Ejemplo de consulta:
    query{
      user(userId: "1"){
        userId,email
      }
    }
   */
  @Query(() => User, { name: 'user', nullable: true })
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.usersService.getUser(getUserArgs);
  }
  /*
    Ejemplo de consulta:
    mutation{
      createUser(createUserData:{
        email:"p@p.com",
        age:12,
      }){
        email,age, userId, isSubscribed
      }
    }
   */
  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput): User {
    return this.usersService.createUser(createUserData);
  }
}
