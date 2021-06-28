import { Injectable } from '@nestjs/common';
import client from 'src/client';

@Injectable()
export class EventService {
  seeEvents = () => client.event.findMany({ include: { owner: true } });

  seeEvent = ({ id }) =>
    client.event.findUnique({
      where: { id },
      include: { owner: true },
    });

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

  async deleteEvent({ id }, user) {
    try {
      const event = await client.event.findUnique({ where: { id } });
      if (!event) {
        throw new Error('id is wrong');
      }
      if (event.userId !== user.id) {
        throw new Error("You can't delete this event");
      }
      await client.event.delete({ where: { id } });
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        error: e.message,
      };
    }
  }
}
