import { DBBase } from './db';
import { IEvent } from '../../interfaces/users.interface';
import Schedule from './schedule';

class Event extends DBBase<IEvent> {

    public constructor(name: string) {
        super(name);
    }

    public async get(id: number | string) {
        return await this.query(`SELECT * FROM events WHERE id = ${id}`);
    }
    
    public async create(event: IEvent) {

        const schedule = new Schedule('taskSchedule');
        const schedule_id = await schedule.create(event.schedule_id);

        return await this.query(`INSERT INTO events(
                                        name, 
                                        create_date, 
                                        schedule_id, 
                                        remark, 
                                        status_id, 
                                        address_id) 
                                VALUES('${event.name}', 
                                NOW(), 
                                ${schedule_id}, 
                                '${event.remark}', 
                                ${event.status_id}, 
                                ${event.address_id})`);         
    }
    
    public async update(event: IEvent) {
          
        const schedule = new Schedule('taskSchedule');
        await schedule.update(event.schedule_id);
        
        return await this.query(`UPDATE events SET 
                                    status_id=${event.status_id},
                                    name='${event.name}',
                                    remark='${event.remark}',
                                    WHERE id=${event.id}`);
    }
    
    public async getAll() {
        return await this.query(`SELECT * FROM events`);
    }

    public async getAllByAddressId(addressId: number) {
        return await this.query(`SELECT * FROM events WHERE address_id=${addressId}`);
    }

    public async delete(id: number) {
        return await this.query(`DELETE FROM events WHERE id=${id}`);
    }

    public async updateStatus(id: number, status: 'new' | 'canceled' | 'deleted' | 'active')  {
        
        let status_id = 1;
        switch(status) {
            case 'new':
                status_id = 1;
                break;
            case 'canceled':
                status_id = 2;
                break;
            case 'deleted':
                status_id = 3;
                break;
            case 'active':
                status_id = 4;
                break;
        }

        return await this.query(`UPDATE events SET status_id=${status_id} WHERE id=${id}`);
    }
}

export default Event;