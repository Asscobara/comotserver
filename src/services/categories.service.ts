import { ICategory } from '../interfaces/users.interface';
import BaseService from './base.service';
import Category from './db/category';

class CategoriesService extends BaseService<ICategory, Category>  {
    protected createDb(): Category {
        return new Category('category');
    }      
}

export default CategoriesService;
