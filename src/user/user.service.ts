import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  hello(): String {
    return 'Hello';
  }
}
