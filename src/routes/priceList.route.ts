import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { CreatePriceDto } from '../dtos/price.dto';
import priceListController from '../controllers/priceList.controller';

class PriceListRoute implements Route {
  public path = '/priceList';
  public router = Router();
  public priceListController = new priceListController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.priceListController.findAllPriceList);
    this.router.post(`${this.path}`, validationMiddleware(CreatePriceDto), this.priceListController.createPrice);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreatePriceDto, true), this.priceListController.updatePrice);
    this.router.delete(`${this.path}/:id(\\d+)`, this.priceListController.deletePrice);
  }
}

export default PriceListRoute;
