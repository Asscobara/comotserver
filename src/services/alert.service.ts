import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { isEmptyObject } from '../utils/util';
import { IUser, IAlert } from 'interfaces/users.interface';
import User from './db/user';
import EmailService from './email/email.service';
import Configuration from '../app-config';
import Alert from './db/alert';
import BaseService from './base.service';

class AlertService extends BaseService<IAlert, Alert>{
  
  protected createDb(): Alert {
    return new Alert('alert');
  }  

  public async findByUserId(userId: number) {
    const alerts: IAlert[] = await (this.db as Alert).getAllByUser(userId);
    return alerts;
  }  

}

export default AlertService;
