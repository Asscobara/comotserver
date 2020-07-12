
import { IAddress } from 'interfaces/users.interface';

export class CreateAddressDto implements IAddress {
    public id: number;
    public title: string;
    public description: string;
    public street: string;
    public city: string;
    public payment_day_in_month: number;
    public payment_amount: number;
}
