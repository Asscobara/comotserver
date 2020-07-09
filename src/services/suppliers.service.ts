import { ISupplier, IUser } from '../interfaces/users.interface';
import BaseService from './base.service';
import Supplier from './db/supplier';

class SuppliersService extends BaseService<ISupplier, Supplier>  {

    protected createDb(): Supplier {
        return new Supplier('supplier');
    }

    public async getAllRelatedSuppliers(user: IUser, roleId: number) {
        return (this.db as Supplier).getAllRelatedSuppliers(user, roleId) ;
    }

}

export default SuppliersService;
