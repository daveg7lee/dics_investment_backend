import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
export class User extends CoreEntity {
  @Field((type) => String)
  username: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  avatar?: string;
}
