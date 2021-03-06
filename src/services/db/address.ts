import { DBBase } from './db';
import { IAddress } from '../../interfaces/users.interface';

class Address extends DBBase<IAddress> {

    public constructor(name: string) {
        super(name);
    }

    public async get(id: number | string) {
        return await this.query(`SELECT *  FROM address WHERE id = ${id}`);
    }

    public async create(address: IAddress) {
        return await this.query(`INSERT INTO address(title, street, city, description, payment_day_in_month, payment_amount) 
                    VALUES('${address.title}', '${address.street}', '${address.city}', '${address.description}', ${address.payment_day_in_month}, ${address.payment_amount})`);
    }
    
    public async update(address: IAddress) {
        return await this.query(`UPDATE address 
                                SET city='${address.city}', 
                                description='${address.description}', 
                                street='${address.street}', 
                                title='${address.title}',
                                payment_day_in_month=${address.payment_day_in_month}, 
                                payment_amount=${address.payment_amount} 
                                WHERE id=${address.id}`);
    }
    
    public async getAll() {
        return await this.query(`SELECT * FROM address`);
    }

    public async delete(id: number) {
        return await this.query(`DELETE FROM address WHERE id=${id}`);
    }
}

export default Address;