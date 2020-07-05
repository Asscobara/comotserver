import Transaction from "./db/transaction";
import { ITransaction, IAddress } from "interfaces/users.interface";
import BaseService from "./base.service";

class TransactionService extends BaseService<ITransaction, Transaction> { 

    protected createDb(): Transaction {
        return new Transaction('transaction');
    }  

    public async getAddressTransacions(address: IAddress): Promise<ITransaction[]> {
        return await (this.db as Transaction).getAddressTransacions(address);
    }
}

export default TransactionService;

