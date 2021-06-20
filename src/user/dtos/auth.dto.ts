import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class AuthInput extends PickType(User, [
  'email',
  'username',
  'avatar',
]) {}

@ObjectType()
export class AuthOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  token?: string;
}
