import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@InputType('EventInputType', { isAbstract: true })
@ObjectType()
export class Event {
  @Field((type) => Number)
  id: Number;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  purpose: string;

  @Field((type) => User)
  owner: User;

  @Field((type) => String)
  payUrl: String;

  @Field((type) => String)
  banner: String;
}
