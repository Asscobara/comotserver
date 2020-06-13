import { DBBase } from './db';
import { IUser } from 'interfaces/users.interface';


class User extends DBBase<IUser> {

    public constructor(name: string) {
        super(name);
    }

    public async get(id: number | string) {
        return await this.query(`SELECT * FROM users WHERE id = ${id}`);
    }
    
    public async create(user: IUser) {
        return await this.query(`INSERT INTO users(first_name, last_name, email) VALUES('${user.first_name}', '${user.last_name}', '${user.email}')`);
    }
    
    public async update(user: IUser) {
        return await this.query(`UPDATE users SET email='${user.email}', first_name='${user.first_name}', last_name='${user.last_name}' WHERE id=${user.id}`);
    }
    
    public async getAll() {
        return await this.query(`SELECT * FROM users`);
    }

    public async delete(id: number) {
        return await this.query(`DELETE FROM users WHERE id=${id}`);
    }
}

export default User;