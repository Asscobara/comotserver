import { IPrice } from '../interfaces/users.interface';
import BaseService from './base.service';
import Price from './db/price';
import { threadId } from 'worker_threads';

class PriceListService extends BaseService<IPrice, Price>  {
    protected createDb(): Price {
        return new Price('priceList');
    }      

    public async findPriceListBySupplierId(supplierId : number) {
        return await (this.db as Price).getBySupplierId(supplierId);
     }
}

export default PriceListService;
