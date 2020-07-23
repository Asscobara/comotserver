import { Router } from 'express';
import GeneralController from '../controllers/general.controller';
import { CreateSendMailDto } from '../dtos/sendMail.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class MailRoute implements Route {
  public router = Router();
  public generalController = new GeneralController();
  public path: string = '/mail';  
  
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreateSendMailDto), this.generalController.sendEmail);
  }
}

export default MailRoute;
