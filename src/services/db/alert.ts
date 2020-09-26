import { DBBase } from './db';
import { IAlert } from '../../interfaces/users.interface';
import { getDate } from './../../utils/util';

class Alert extends DBBase<IAlert> {

    public constructor(name: string) {
        super(name);
    }

    public async get(id: number | string) {
        return await this.query(`SELECT * FROM alerts WHERE id = ${id}`);
    }
    
    public async create(alert: IAlert) {
        return await this.query(`INSERT INTO alerts(create_date, message, sendto_user_id, status_id, code_id) 
                                VALUES('${getDate(alert.create_date)}', '${alert.message}', ${alert.sendto_user_id}, ${alert.status_id}, ${alert.code_id})`);
    }
    
    public async update(alert: IAlert) {
        return await this.query(`UPDATE alerts SET status_id='${alert.status_id}' WHERE id=${alert.id}`);
    }
    
    public async getAll() {
        return await this.query(`SELECT * FROM alerts`);
    }

    public async getAllByUser(userId: number) {
        return await this.query(`SELECT * FROM alerts WHERE sendto_user_id=${userId} ORDER BY status_id`);
    }

    public async delete(id: number) {
        return await this.query(`DELETE FROM alerts WHERE id=${id}`);
    }
    public async markAsDeleted(id: number) {
        return await this.query(`UPDATE alerts SET status_id='3' WHERE id=${id}`);
    }
}

export default Alert;