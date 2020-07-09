
import { IRecipt } from 'interfaces/users.interface';

export class CreateReciptDto implements IRecipt {
  public id: number;
  public recipt_number: string;
  public user_id: number;
  public date_time: any;
  public email_sent: boolean;
}
