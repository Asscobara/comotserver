import { DBBase } from './db';
import { IUser } from 'interfaces/users.interface';
import { v4 as uuid } from 'uuid';

class User extends DBBase<IUser> {

    public constructor(name: string) {
        super(name);
    }

    public async get(id: number | string) {
        return await this.query(`SELECT id, email, password, first_name, last_name, is_logged_in, role_id, phone, remark, address_id, floor_number, apartment_number 
                                FROM users WHERE id = ${id}`);
    }

    public async create(user: IUser) {
        return await this.query(`INSERT INTO users(first_name, last_name, email, password, is_logged_in, registered, role_id, address_id, floor_number, apartment_number) 
                    VALUES('${user.first_name}', '${user.last_name}', '${user.email}', '${user.password}', FALSE, FALSE, ${user.role_id}, ${user.address_id}, ${user.floor_number}, ${user.apartment_number})`);
    }
    
    public async update(user: IUser) {
        return await this.query(`UPDATE users SET 
                            email='${user.email}', 
                            first_name='${user.first_name}', 
                            last_name='${user.last_name}', 
                            phone='${user.phone}', 
                            address_id=${user.address_id},
                            floor_number=${user.floor_number}, 
                            apartment_number=${user.apartment_number}
                            WHERE id=${user.id}`);
    }

    public async updatePassword(user: IUser) {
        return await this.query(`UPDATE users SET password='${user.password}' WHERE id=${user.id}`);
    }
    
    public async getAll() {
        return await this.query(`SELECT * FROM users`);
    }

    public async delete(id: number) {
        return await this.query(`DELETE FROM users WHERE id=${id}`);
    }

    public async register(id: number) {
        return await this.query(`UPDATE users SET registered=TRUE, register_date=NOW() WHERE id=${id}`);
    }

    public async updateRegistrationKey(id: number, key: string) {
        return await this.query(`UPDATE users SET registration_key='${key}' WHERE id=${id}`);
    }

    public async getRegistrationKey(id: number) {
        return await this.query(`SELECT registration_key FROM users WHERE id = ${id}`);
    }

    public async getVerificationUrl(user: IUser) {
        const key = uuid();
        await this.updateRegistrationKey(user.id, key);
        const url = `http://localhost:3000/verify?id=${user.id}&key=${key}`;
        return url;
    }   

    public async getAllRelatedUsers(user: IUser): Promise<IUser[]> {        
        return await this.query(`SELECT * FROM users WHERE address_id=${user.address_id} AND role_id<>5`);
    }
}

export default User;