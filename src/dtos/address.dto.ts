
import { IAddress } from 'interfaces/users.interface';

export class CreateAddressDto implements IAddress {
    public id: number;
    public title: string;
    public description: string;
    public street: string;
    public city: string;
}
