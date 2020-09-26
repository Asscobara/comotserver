import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { isEmptyObject } from '../utils/util';
import { IAlert } from 'interfaces/users.interface';
import Alert from './db/alert';
import BaseService from './base.service';

class AlertService extends BaseService<IAlert, Alert>{
  
  protected createDb(): Alert {
    return new Alert('alert');
  }  

  public async findByUserId(userId: number) {
    const alerts: IAlert[] = await (this.db as Alert).getAllByUser(userId);
    return alerts.filter(a => a.status_id != 3);
  }  

  public async updateAlert(alertData: IAlert): Promise<IAlert[]> {
    return (this.db as Alert).update(alertData);
  }

  public async deleteAlert(alertId: number): Promise<IAlert[]> {
    return (this.db as Alert).markAsDeleted(alertId);
  }

}

export default AlertService;
