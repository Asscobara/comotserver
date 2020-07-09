
import { DBBase } from './db';
import { IRecipt } from '../../interfaces/users.interface';

class Recipt extends DBBase<IRecipt> {

    public constructor(name: string) {
        super(name);
    }

    public async get(id: number | string) {
        return await this.query(`SELECT *  FROM recipts WHERE id = ${id}`);
    }

    public async create(recipts: IRecipt) {
        return await this.query(`INSERT INTO recipts(recipt_number, user_id, email_sent, date_time) 
                VALUES('${recipts.recipt_number}', ${recipts.user_id}, ${recipts.email_sent}, NOW())`);
    }
    
    public async update(recipt: IRecipt) {
        return this.notImplemented();
    }
    
    public async getAll() {
        return await this.query(`SELECT *  FROM recipts`);
    }

    public async delete(id: number) {
        return this.notImplemented();
    }
}

export default Recipt;