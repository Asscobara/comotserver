import { NextFunction, Request, Response } from 'express';
import { ISupplier, IUser } from '../interfaces/users.interface';

import SuppliersService from '../services/suppliers.service';
import UserService from '../services/users.service';

class SuppliersController {

  // get building suppliers  
  // update - delete

  public supplierService = new SuppliersService();
  public usersService = new UserService();

  public createSupplier = async (req: Request, res: Response, next: NextFunction) => {
    const supplierData: ISupplier = req.body;

    try {
         
      let createRes = await this.usersService.users.create(supplierData.user_id);
      supplierData.user_id.id = createRes.insertId;
      supplierData.user_id.role_id = 5;
      createRes = await this.supplierService.create(supplierData);      
      const createSupplierData = await this.supplierService.findById(createRes.insertId);

      res.status(201).json({ data: createSupplierData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public findAllRelatedSuppliers = async (req: Request, res: Response, next: NextFunction) => {
    
    const userId: number = Number(req.params.id);
    const userData: IUser = await this.usersService.findUserById(userId);
    const findAllUsersData: IUser[] = await this.supplierService.getAllRelatedSuppliers(userData, 5);

    res.status(200).json({ data: findAllUsersData, message: 'findAllByUser' });

  }
}

export default SuppliersController;
