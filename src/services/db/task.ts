import { DBBase } from './db';
import { IUser, IAddress, ITask } from '../../interfaces/users.interface';
import Schedule from './schedule';

class Task extends DBBase<ITask> {

    public constructor(name: string) {
        super(name);
    }

    public async get(id: number | string) {
        return await this.query(`SELECT * FROM tasks WHERE id = ${id}`);
    }

    public async getAddressTasks(address: IAddress) {
        return await this.query(`SELECT * FROM tasks WHERE address_id = ${address.id}`);
    }

    public async getUserTasks(user: IUser) {
        return await this.query(`SELECT * FROM tasks WHERE user_id = ${user.id}`);
    }

    public async create(task: ITask) {

        const schedule = new Schedule('taskSchedule');
        const schedule_id = await schedule.create(task.schedule_id);

        return await this.query(`INSERT INTO tasks(category_id, user_id, sipplier_id, status_id, grade, price, address_id, schedule_id, description, update_date, create_date) 
                VALUES(${task.category_id}, 
                        ${task.user_id.id}, 
                        ${task.sipplier_id},
                        ${task.status_id},
                        ${task.grade},
                        ${task.price},
                        ${task.address_id},
                        ${schedule_id.insertId},
                        '${task.description}', 
                        NOW(), 
                        NOW())`);
    }
    
    public async update(task: ITask) {
        
        const schedule = new Schedule('taskSchedule');

        await schedule.update(task.schedule_id);
        
        return await this.query(`UPDATE tasks SET 
                                category_id=${task.category_id}, 
                                user_id=${task.user_id.id},
                                sipplier_id=${task.sipplier_id.id},
                                status_id=${task.status_id},
                                grade=${task.grade},
                                price=${task.price},
                                address_id=${task.address_id},
                                schedule_id=${task.schedule_id.id},
                                description='${task.description}',
                                update_date=NOW()
                                WHERE id=${task.id}`);
    }
    
    public async getAll() {
        return await this.query(`SELECT * FROM tasks`);
    }

    public async delete(id: number) {
        return await this.query(`DELETE FROM tasks WHERE id=${id}`);
    }
}

export default Task;