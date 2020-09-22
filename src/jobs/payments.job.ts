
import * as schedule from "node-schedule";
import AddressService from '../services/address.service';
import TransactionService from '../services/transaction.service';
import UserService from "../services/users.service";
import AlertService from "../services/alert.service";

import { IAddress, ITransaction, IUser } from "../interfaces/users.interface";


class PaymentsJob {

   public async perform() {
        
        console.log('start perform job');
        const addressService = new AddressService();
        const transactionService = new TransactionService();
        const userService = new UserService();
        const alertService = new AlertService();

        const allBuildings = await addressService.findAll();
        const allPayments = await transactionService.findAll();    
        
        allBuildings.forEach( async (address: IAddress) => {
            const allManagers = await userService.findAllRelatedUsersByRole(address.id, 2);
            const currectUsers = await userService.findAllRelatedUsers(address.id);
            currectUsers.forEach((user: IUser) => {
                const userTransactions = allPayments.filter( (payment:ITransaction) => payment.user_id == user.id );
                const userPaymentsMap: any = {};
                userTransactions.forEach((transaction: ITransaction) => {
                    const month = new Date(transaction.date_time).getMonth();
                    const amount = transaction.transaction_type == 1 ? transaction.amount : -transaction.amount;
                    userPaymentsMap[month] = userPaymentsMap[month] ? userPaymentsMap[month] + amount : 0;
                });
                Object.keys(userPaymentsMap).forEach((key: string) => {
                    if(userPaymentsMap[key] < address.payment_amount) {
                        allManagers.forEach((manager: IUser) => {
                            alertService.create({
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
                            });
                        });
                    }
                });                
           });           
        });

        console.log('end perform job');
   } 

    public init() {
        console.log('init job');
        var rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(0, 6)];
        rule.hour = [0, new schedule.Range(0, 24)]; // 18
        rule.minute = [0, new schedule.Range(0, 60)]; // 0
        schedule.scheduleJob(rule, async () => {
            this.perform();
        });
    }
}
  
  export default PaymentsJob;