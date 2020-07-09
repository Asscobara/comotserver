import { IPrice, ISupplier } from 'interfaces/users.interface';

export class CreatePriceDto implements IPrice {
    public id: number;
    public price: number;
    public sub_category_id: number;
    public supplier_id: ISupplier;  
}