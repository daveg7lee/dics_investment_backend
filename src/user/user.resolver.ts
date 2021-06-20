import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Role } from 'src/auth/role.decorator';
import { AuthInput, AuthOutput } from './dtos/auth.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => String)
  @Role(['Any'])
  hello() {
    return 'hello';
  }

  @Mutation((returns) => AuthOutput)
  async auth(
    @Args('AuthInput') { username, email, avatar }: AuthInput
  ): Promise<AuthOutput> {
    return this.userService.auth(username, email, avatar);
  }
}
