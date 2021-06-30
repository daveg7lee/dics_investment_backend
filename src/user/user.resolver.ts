import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { AuthInput, AuthOutput } from './dtos/auth.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
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

  @Query((returns) => User)
  @Role(['USER'])
  me(@AuthUser() user: User) {
    return user;
  }

  @Mutation((returns) => EditProfileOutput)
  @Role(['USER'])
  editProfile(
    @AuthUser() user: User,
    @Args('EditProfileInput') editProfileInput: EditProfileInput
  ) {
    return this.userService.editProfile(editProfileInput, user);
  }
}
