import { DBBase } from './db';
import { ICategory } from '../../interfaces/users.interface';

class Category extends DBBase<ICategory> {

    public constructor(name: string) {
        super(name);
    }

    public async get(id: number | string) {
        return await this.query(`SELECT * FROM categories WHERE id = ${id}`);
    }
    
    public async create(category: ICategory) {
        return await this.query(`INSERT INTO categories(name, description) VALUES('${category.name}', '${category.description}')`);
    }
    
    public async update(category: ICategory) {
        return await this.query(`UPDATE categories 
                                SET name='${category.name}', description='${category.description}'
                                WHERE id=${category.id}`);
    }
    
    public async getAll() {
        return await this.query(`SELECT * FROM categories`);
    }

    public async delete(id: number) {
        return await this.query(`DELETE FROM categories WHERE id=${id}`);
    }
}

export default Category;