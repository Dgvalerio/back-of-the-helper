import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '@prisma/client';

@ObjectType()
export class UserOutput implements Omit<User, 'password'> {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
