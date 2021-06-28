import { InputType, PickType } from '@nestjs/graphql';
import { Event } from '../entities/event.entity';

@InputType()
export class SeeEventInput extends PickType(Event, ['id']) {}
