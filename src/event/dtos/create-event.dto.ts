import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Event } from '../entities/event.entity';

@InputType()
export class CreateEventInput extends PickType(Event, [
  'title',
  'purpose',
  'payUrl',
  'banner',
]) {}

@ObjectType()
export class CreateEventOutput extends CoreOutput {}
