import { ISubCategory } from 'interfaces/users.interface';

export class CreateSubCategoryDto implements ISubCategory {
    public id: number;
    public name: string;
    public description: string;
    public category_id: number;  
}