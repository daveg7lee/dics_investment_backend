import { Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/role.decorator';

@Resolver()
export class EventResolver {
  @Query((returns) => String)
  @Role(['ADMIN'])
  hello() {
    return 'Hello';
  }
}
