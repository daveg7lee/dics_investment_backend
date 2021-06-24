import { Resolver, Query } from '@nestjs/graphql';
import client from 'src/client';
import { ClubService } from './club.service';
import { Club } from './entities/club.entity';

@Resolver((of) => Club)
export class ClubResolver {
  constructor(private readonly clubService: ClubService) {}

  @Query((returns) => [Club])
  seeClubs() {
    return client.club.findMany();
  }
}
