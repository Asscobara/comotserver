import { DBBase } from './db';
import { ISubCategory } from '../../interfaces/users.interface';

class SubCategory extends DBBase<ISubCategory> {

    public constructor(name: string) {
        super(name);
    }

    public async get(id: number | string) {
        return await this.query(`SELECT * FROM sub_categories WHERE id = ${id}`);
    }
    
    public async create(subCategory: ISubCategory) {
        return await this.query(`INSERT INTO sub_categories(name, description, category_id) 
                                VALUES('${subCategory.name}', '${subCategory.description}', ${subCategory.category_id})`);
    }
    
    public async update(subCategory: ISubCategory) {
        return await this.query(`UPDATE sub_categories 
                                SET name='${subCategory.name}', 
                                description='${subCategory.description}',
                                category_id=${subCategory.category_id}
                                WHERE id=${subCategory.id}`);
    }
    
    public async getAll() {
        return await this.query(`SELECT * FROM sub_categories`);
    }

    public async delete(id: number) {
        return await this.query(`DELETE FROM sub_categories WHERE id=${id}`);
    }
}

export default SubCategory;