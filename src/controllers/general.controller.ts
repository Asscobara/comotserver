import { NextFunction, Request, Response } from 'express';
import EmailService from "../services/email/email.service";
import { ISendEmail } from "../interfaces/users.interface";

class GeneralController {
  
    public sendEmail = async (req: Request, res: Response, next: NextFunction) => { 
        const mailData: ISendEmail = req.body;
        try {
           EmailService.sendGeneralMessage(mailData);
           res.status(200).json({ data: '', message: 'mail sent' });
        } catch (error) {
          next(error);
        }
    }
  }
  
  export default GeneralController;
  