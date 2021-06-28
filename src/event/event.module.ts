import { Module } from '@nestjs/common';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

@Module({
  providers: [EventService, EventResolver],
})
export class EventModule {}
