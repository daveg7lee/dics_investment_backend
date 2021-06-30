import { Injectable } from '@nestjs/common';
import client from 'src/client';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';
import { User } from './entities/user.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}

  // create new user if not exists
  async auth(id, email, username, avatar) {
    try {
      // check is there user
      const user = await client.user.findUnique({ where: { email } });
      if (user) {
        // check user's id if there are user
        const checkId = await bcrypt.compare(id.toString(), user.id);
        if (checkId) {
          // make token if id is correct
          const token = this.jwtService.sign(user.id);
          // return token with ok sign
          return { ok: true, token };
        } else {
          // throw error when id is incorrect
          throw new Error('Id is incorrect');
        }
      }
      // hashing id for security
      const hashedId = await bcrypt.hash(String(id), 10);
      // make new user with email, username, avatar, and hashedId
      const newUser = await client.user.create({
        data: { email, username, avatar, id: hashedId },
      });
      // make token with user id
      const token = this.jwtService.sign(newUser.id);
      // return token with ok sign
      return { ok: true, token };
    } catch (e) {
      // return error when there are error
      return { ok: false, error: e.message };
    }
  }
  async editProfile(
    { username, avatar, payUrl }: EditProfileInput,
    user: User
  ) {
    try {
      await client.user.update({
        where: { id: user.id },
        data: { username, avatar, payUrl },
      });
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        error: e.message,
      };
    }
  }
}
