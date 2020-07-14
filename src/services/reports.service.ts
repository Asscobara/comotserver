import TasksService from './tasks.service';
import UserService from './users.service';
import AddressService from './address.service';
import TransactionService from './transaction.service';
import { IAddress, ITransaction } from '../interfaces/users.interface';

class ReportsService  {
    
    tasks: TasksService;
    users: UserService;
    address: AddressService;
    transactions: TransactionService;

    public async getAddressTransaciotnsByDates(address: IAddress, from_date: any, to_date: any) {
        this.transactions = new TransactionService();    
        const currentTransactions = await this.transactions.getAddressTransacions(address);        
        return currentTransactions.filter((transaction: ITransaction) => transaction.date_time > from_date && transaction.date_time < to_date);
    }

    public async getPaymentsStatus(address: IAddress, from_date: any, to_date: any) {
       const  currentTransactions = await this.getAddressTransaciotnsByDates(address, from_date, to_date);
           
    }
}

export default ReportsService;
