import { IRecipt, ITransaction } from "./../interfaces/users.interface";
import BaseService from "./base.service";
import Recipt from "./db/recipt";
import { CreateReciptDto } from '../dtos/recipt.dto';
import EmailService from "./email/email.service";
import User from "./db/user";

class ReciptService extends BaseService<IRecipt, Recipt> { 


    protected createDb(): Recipt {
        return new Recipt('recipt');
    }  

    public async createRecipt(reciptData: CreateReciptDto, transaction: ITransaction, sendEmail: boolean): Promise<IRecipt> {
        const createdRecipt = await this.create(reciptData);
        const newRecipt = (await this.db.get((createdRecipt as any).insertId) as any)[0];
        if (newRecipt && sendEmail) {
            const user = (await (new User('userToRecipt').get(newRecipt.user_id)) as any)[0];
            
            EmailService.sendUserRecipt(user, newRecipt, transaction);
        }
        return createdRecipt;
      }

}

export default ReciptService;

