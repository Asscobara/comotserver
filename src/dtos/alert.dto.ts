
import { IAlert, IUser } from 'interfaces/users.interface';

export class CreateAlertDto implements IAlert {
  id: number;
  create_date: any;
  message: string;
  sendto_user_id: number;
  status_id: number;
  code_id: number;
}
