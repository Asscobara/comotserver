import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { CreateSupplierDto } from '../dtos/supplier.dto';
import SuppliersController from '../controllers/supplier.controller';

class SuppliersRoute implements Route {
  public path = '/suppliers';
  public router = Router();
  public supplierController = new SuppliersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, this.supplierController.findAllRelatedSuppliers);
    this.router.post(`${this.path}`, validationMiddleware(CreateSupplierDto), this.supplierController.createSupplier);
//    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateAddressDto, true), this.addressController.updateAdress);
//    this.router.delete(`${this.path}/:id(\\d+)`, this.addressController.deleteAdress);
  }
}

export default SuppliersRoute;
