import { Injectable } from '@nestjs/common';
import client from 'src/client';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}

  // create new user if not exists
  async auth(username, email, avatar) {
    try {
      const user = await client.user.findUnique({ where: { email } });
      if (user) {
        const token = this.jwtService.sign(user.id);
        return { ok: true, token };
      }
      const newUser = await client.user.create({
        data: { email, username, avatar },
      });
      const token = this.jwtService.sign(newUser.id);
      return { ok: true, token };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }
}
