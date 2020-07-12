import { IPrice } from '../interfaces/users.interface';
import BaseService from './base.service';
import Price from './db/price';

class PriceListService extends BaseService<IPrice, Price>  {
    protected createDb(): Price {
        return new Price('priceList');
    }      
}

export default PriceListService;
