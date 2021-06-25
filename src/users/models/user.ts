import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Hobby } from './hobby';

@ObjectType()
export class User {
  @Field((type) => String)
  userId: string;

  @Field((type) => Date, { name: 'registeredAt' })
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => String)
  email: string;

  password: string;

  @Field((type) => String, { nullable: true })
  name?: string;

  @Field((type) => [Hobby])
  hobbies: Hobby[];
}
