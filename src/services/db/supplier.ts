import { DBBase } from './db';
import { ISupplier, IUser } from '../../interfaces/users.interface';
import User from './user';

class Supplier extends DBBase<ISupplier> {

    public constructor(name: string) {
        super(name);
    }

    public async get(id: number | string) {
        return await this.query(`SELECT * FROM suppliers WHERE id = ${id}`);
    }
    
    public async create(supplier: ISupplier) {
        return await this.query(`INSERT INTO suppliers(remark, category_id, user_id, sub_categories_id) 
                                VALUES('${supplier.remark}', ${supplier.category_id}, ${supplier.user_id.id}, '${supplier.sub_categories_id}')`);
    }
    
    public async update(supplier: ISupplier) {
        
        const userDb = new User('supplierUser');
        const user = supplier.user_id; 
        await userDb.update(user as any);

        return await this.query(`UPDATE suppliers 
                                SET remark='${supplier.remark}', 
                                category_id=${supplier.category_id},
                                user_id=${supplier.user_id.id},
                                sub_categories_id=${supplier.sub_categories_id}
                                WHERE id=${supplier.id}`);
    }
    
    public async getAll() {
        return await this.query(`SELECT * FROM suppliers`);
    }

    public async delete(id: number) {
        return await this.query(`DELETE FROM suppliers WHERE id=${id}`);
    }

    public async getAllRelatedSuppliers(user: IUser, roleId: number) {
        return await this.query(`SELECT * FROM users u 
                                INNER JOIN suppliers s
                                ON u.id=s.user_id AND
                                u.address_id=${user.address_id} AND
                                role_id=${roleId}`);
    }

}

export default Supplier;