import { DBBase } from './db';
import { ISchedule } from '../../interfaces/users.interface';
import { getDate } from './../../utils/util';

class Schedule extends DBBase<ISchedule> {

    public constructor(name: string) {
        super(name);
    }

    public async get(id: number | string) {
        return await this.query(`SELECT *  FROM tasks WHERE id = ${id}`);
    }
  
    public async create(schedule: ISchedule) {        
        return await this.query(`INSERT INTO tasks(start_date, end_date, recuring, recuring_every_in_days) 
                VALUES('${getDate(schedule.start_date)}', '${getDate(schedule.end_date)}', ${schedule.recuring}, ${schedule.recuring_every_in_days})`);
    }
    
    public async update(schedule: ISchedule) {
        return await this.query(`UPDATE schedules SET 
                                start_date='${getDate(schedule.start_date)}',
                                end_date='${getDate(schedule.end_date)}', 
                                recuring=${schedule.recuring},
                                recuring_every_in_days=${schedule.recuring_every_in_days}
                                WHERE id=${schedule.id}`);
    }
    
    public async getAll() {
        return await this.query(`SELECT * FROM schedules`);
    }

    public async delete(id: number) {
        return await this.query(`DELETE FROM schedules WHERE id=${id}`);
    }
}

export default Schedule;