import { IUser, IAddress } from '../interfaces/users.interface';
import Address from './db/address';
import BaseService from './base.service';
import UserService from './users.service';

class AddressService extends BaseService<IAddress, Address>  {

    private users = new UserService();
    protected createDb(): Address {
        return new Address('address');
    }  

    public async findByUserId(userId: number) {
        const user: IUser = await this.users.findUserById(userId);
        return this.findById(user.address_id);
    }  
}

export default AddressService;
