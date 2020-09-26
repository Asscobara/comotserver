
import * as schedule from "node-schedule";
import AddressService from '../services/address.service';
import TransactionService from '../services/transaction.service';
import UserService from "../services/users.service";
import AlertService from "../services/alert.service";

import { IAddress, ITransaction, IUser, IAlert } from "../interfaces/users.interface";


class PaymentsJob {
   public alertService = new AlertService();

   public async perform() {
        
        console.log('start perform job');
        const addressService = new AddressService();
        const transactionService = new TransactionService();
        const userService = new UserService();
        
        const allBuildings = await addressService.findAll();
        const allPayments = await transactionService.findAll();    
        
        allBuildings.forEach( async (address: IAddress) => {
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
                            this.shouldAddAlert(candidateAlert).then((add: boolean)=> {
                                if (add) {
                                    console.log(`adding new alert [ ${JSON.stringify(candidateAlert)} ]`);
                                    this.alertService.create(candidateAlert);
                                }
                            });                            
                        });
                    }
                });                
           });           
        });

        console.log('end perform job');
    } 
    
    public async shouldAddAlert(alert: IAlert) {
        const allAlerts = await this.alertService.findAll();
        const found = allAlerts.find(a => {
                return a.code_id == alert.code_id && 
                   a.message == alert.message && 
                   a.sendto_user_id == alert.sendto_user_id
        });
        return found == null;
    }

    public init() {
        console.log('init job');
        var rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(0, 6)];
        rule.hour = [0, new schedule.Range(0, 23)]; // 18;
        rule.minute = [0, new schedule.Range(0, 59)]; // 0;
        schedule.scheduleJob(rule, async () => {
            this.perform();
        });
    }
}
  
  export default PaymentsJob;