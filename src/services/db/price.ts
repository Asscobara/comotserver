import { DBBase } from './db';
import { IPrice } from '../../interfaces/users.interface';

class Price extends DBBase<IPrice> {

    public constructor(name: string) {
        super(name);
    }

    public async getBySupplierId(supplier_id: number) {
        return await this.query(`SELECT * FROM price_list WHERE supplier_id = ${supplier_id}`);
    }

    public async get(id: number | string) {
        return await this.query(`SELECT * FROM price_list WHERE id = ${id}`);
    }
    
    public async create(price: IPrice) {
        
        return await this.query(`INSERT INTO price_list(price, name, sub_category_id, supplier_id) 
                                VALUES(${price.price}, '${price.name}', ${1}, ${price.supplier_id.id})`);
    }
    
    public async update(price: IPrice) {
        return await this.query(`UPDATE price_list 
                                SET price=${price.price}, 
                                name='${price.name}',
                                sub_category_id=${1},
                                supplier_id=${price.supplier_id.id}
                                WHERE id=${price.id}`);
    }
    
    public async getAll() {
        return await this.query(`SELECT * FROM price_list`);
    }

    public async delete(id: number) {
        return await this.query(`DELETE FROM price_list WHERE id=${id}`);
    }
}

export default Price;