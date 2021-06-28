import { Injectable } from '@nestjs/common';
import client from 'src/client';

@Injectable()
export class EventService {
  hello() {
    return 'hello';
  }

  async createEvent({ title, purpose, payUrl }, owner) {
    try {
      const isTitle = await client.event.findUnique({ where: { title } });
      if (isTitle) {
        throw new Error('There are duplicate title.');
      }
      await client.event.create({
        data: { title, payUrl, purpose, owner: { connect: { id: owner.id } } },
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
