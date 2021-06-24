import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/user/entities/user.entity';

@InputType('ClubInputType', { isAbstract: true })
@ObjectType()
export class Club extends CoreEntity {
  @Field((type) => String)
  name: string;

  @Field((type) => User)
  owner: User;

  @Field((type) => String)
  description?: string;
}
