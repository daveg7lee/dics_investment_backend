import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateEventInput, CreateEventOutput } from './dtos/create-event.dto';
import { Event } from './entities/event.entity';
import { EventService } from './event.service';

@Resolver((of) => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query((returns) => String)
  @Role(['Any'])
  hello() {
    return this.eventService.hello();
  }

  @Mutation((returns) => CreateEventOutput)
  @Role(['USER'])
  createEvent(
    @AuthUser() owner: User,
    @Args('CreateEventInput') createEventInput: CreateEventInput
  ) {
    return this.eventService.createEvent(createEventInput, owner);
  }
}
