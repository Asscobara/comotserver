import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { CreateAlertDto } from '../dtos/alert.dto';
import alertController from '../controllers/alert.controller';

class alertRoute implements Route {
  public path = '/alerts';
  public router = Router();
  public alertController = new alertController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, this.alertController.getAlertsByUserId);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateAlertDto, true), this.alertController.updateAlert);
    this.router.delete(`${this.path}/:id(\\d+)`, this.alertController.deleteAlert);
  }
}

export default alertRoute;
