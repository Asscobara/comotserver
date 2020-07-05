import { DBBase } from './db';
import { ITransaction, IUser, IAddress } from '../../interfaces/users.interface';

class Transaction extends DBBase<ITransaction> {

    public constructor(name: string) {
        super(name);
    }

    public async get(id: number | string) {
        return await this.query(`SELECT *  FROM transactions WHERE id = ${id}`);
    }

    public async getAddressTransacions(address: IAddress) {
        return await this.query(`SELECT * FROM transactions t
                                 INNER JOIN users u
                                 ON u.address_id = ${address.id} AND u.id = t.user_id`);
    }

    public async getUserTransacions(user: IUser) {
        return await this.query(`SELECT * FROM transactions WHERE user_id = ${user.id}`);
    }

    public async create(transaction: ITransaction) {
        return await this.query(`INSERT INTO transactions(amount, transaction_type, user_id, remark, date_time) 
                VALUES(${transaction.amount}, ${transaction.transaction_type}, ${transaction.user_id}, '${transaction.remark}', NOW())`);
    }
    
    public async update(transaction: ITransaction) {
        return await this.query(`SELECT *  FROM transactions`);
    }
    
    public async getAll() {
        return await this.query(`SELECT * FROM transactions`);
    }

    public async delete(id: number) {
        return await this.query(`DELETE FROM transactions WHERE id=${id}`);
    }
}

export default Transaction;