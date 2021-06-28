import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Role } from 'src/auth/role.decorator';
import { AuthInput, AuthOutput } from './dtos/auth.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => AuthOutput)
  async auth(
    @Args('AuthInput') { id, email, username, avatar }: AuthInput
  ): Promise<AuthOutput> {
    return this.userService.auth(id, email, username, avatar);
  }
}
