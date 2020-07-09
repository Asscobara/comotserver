
import { ICategory } from 'interfaces/users.interface';

export class CreateCategoryDto implements ICategory {
    public id: number;
    public name: string;
    public description: string;
}
