import { ISupplier, IUser } from 'interfaces/users.interface';

export class CreateSupplierDto implements ISupplier {
    public id: number;
    public user_id: IUser;
    public remark: string;
    public category_id: number;  
    public sub_categories_id: string;  
}