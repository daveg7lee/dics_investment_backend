import { Controller } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Query((returns) => String)
  hello() {
    return this.userService.hello();
  }
}
