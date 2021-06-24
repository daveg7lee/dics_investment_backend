import { Module } from '@nestjs/common';
import { ClubResolver } from './club.resolver';
import { ClubService } from './club.service';

@Module({
  providers: [ClubService, ClubResolver],
})
export class ClubModule {}
