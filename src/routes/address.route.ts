import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { CreateAddressDto } from '../dtos/address.dto';
import AddressController from '../controllers/address.controller';

class AddressRoute implements Route {
  public path = '/address';
  public router = Router();
  public addressController = new AddressController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, this.addressController.getAddressByUserId);
    this.router.post(`${this.path}`, validationMiddleware(CreateAddressDto), this.addressController.createAddress);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateAddressDto, true), this.addressController.updateAdress);
    this.router.delete(`${this.path}/:id(\\d+)`, this.addressController.deleteAdress);
  }
}

export default AddressRoute;
