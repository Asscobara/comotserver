
import { ITransaction } from 'interfaces/users.interface';

export class CreateTransactionDto implements ITransaction {
    public id: number;
    public amount: number;
    public transaction_type: number;
    public date_time: any;
    public user_id: number;
    public remark: string;
}