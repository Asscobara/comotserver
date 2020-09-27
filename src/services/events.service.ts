import { IEvent } from '../interfaces/users.interface';
import BaseService from './base.service';
import Event from './db/event';

class EventsService extends BaseService<IEvent, Event>  {

    protected createDb(): Event {
        return new Event('event');
    }

    public async getAllRelatedEvents(addressId: number): Promise<IEvent[]> {
        return (this.db as Event).getAllByAddressId(addressId);
    }
}

export default EventsService;
