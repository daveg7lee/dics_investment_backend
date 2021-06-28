import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/user/entities/user.entity';

@InputType('EventInputType', { isAbstract: true })
@ObjectType()
export class Event extends CoreEntity {
  @Field((type) => String)
  title: string;

  @Field((type) => String)
  purpose: string;

  @Field((type) => User)
  owner: User;

  @Field((type) => String)
  payUrl: String;
}
