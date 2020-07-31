import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import ReportsController from '../controllers/reports.controller';

class ReportsRoute implements Route {
  public path = '/report';
  public router = Router();
  public reportsController = new ReportsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/payments/:id(\\d+)/:from_date`, this.reportsController.getPaymentsStatus);
    this.router.get(`${this.path}/suppliers/:id(\\d+)/`, this.reportsController.getSupliersReport);
    this.router.get(`${this.path}/tasks/:id(\\d+)/`, this.reportsController.getTasksReport);
  }
}

export default ReportsRoute;
