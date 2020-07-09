import { ISubCategory } from '../interfaces/users.interface';
import BaseService from './base.service';
import SubCategory from './db/subCategory';

class SubCategoriesService extends BaseService<ISubCategory, SubCategory>  {

    protected createDb(): SubCategory {
        return new SubCategory('subCategory');
    }  
    
}

export default SubCategoriesService;
