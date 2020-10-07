import AddressService from '../services/address.service';
import TransactionService from '../services/transaction.service';
import UserService from "../services/users.service";
import BaseJob from './base.job'

import { IAddress, ITransaction, IUser, IAlert } from "../interfaces/users.interface";
import { printDebug } from "../utils/util";

class PaymentsJob extends BaseJob {

    constructor() {
        super('payments');
    }

    protected async perform() {
        
        const addressService = new AddressService();
        const transactionService = new TransactionService();
        const userService = new UserService();
        
        const allBuildings = await addressService.findAll();
        const allPayments = await transactionService.findAll();    
        
        allBuildings?.forEach( async (address: IAddress) => {
            const allManagers = await userService.findAllRelatedUsersByRole(address.id, 2);
            const currectUsers = await userService.findAllRelatedUsers(address.id);
            currectUsers.forEach((user: IUser) => {
                const userTransactions = allPayments.filter( (payment:ITransaction) => payment.user_id == user.id );
                const userPaymentsMap: any = {};
                userPaymentsMap[ (new Date()).getMonth() ] = 0;
                userTransactions.forEach((transaction: ITransaction) => {
                    const month = new Date(transaction.date_time).getMonth();
                    const amount = transaction.transaction_type == 1 ? transaction.amount : -transaction.amount;
                    userPaymentsMap[month] = (userPaymentsMap[month] != undefined ? userPaymentsMap[month] : 0) + amount;
                });
                Object.keys(userPaymentsMap).forEach((key: string) => {
                    if(userPaymentsMap[key] < address.payment_amount) {
                        allManagers.forEach((manager: IUser) => {
                            const candidateAlert: IAlert  = {
                                id: 0,
                                create_date: Date.now(),
                                message: JSON.stringify({
                                    'month': key, 
                                    'amount': userPaymentsMap[key],
                                    'addressId': address.id,
                                    'userId': user.id
                                }),
                                sendto_user_id: manager.id,
                                status_id: 1,
                                code_id: 1
                            };
                            this.shouldAddAlert(address.id, candidateAlert, 'payment_alert').then((add: boolean)=> {
                                if (add) {
                                    this.alertService.create(candidateAlert);
                                }
                            });                            
                        });
                    }
                });                
           });           
        });
    } 
}
  
export default PaymentsJob;