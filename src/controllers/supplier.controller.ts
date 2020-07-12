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
      const newUser = await this.usersService.users.get(createRes.insertId);

      supplierData.user_id = newUser[0];
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
    const findAllUsersData: any[] = await this.supplierService.getAllRelatedSuppliers(userData, 5);

    const allSuppliers: ISupplier[] = [];

    findAllUsersData.forEach(u => {
      allSuppliers.push({
        category_id: u.category_id,
        user_id: {
          first_name: u.first_name,
          last_name: u.last_name,
          email: u.email,
          phone: u.phone,
          role_id: u.role_id,
          password: u.password,
          id: u.user_id,
          is_logged_in: u.is_logged_in,
          remark: u.remark,
          registered: u.registered,
          floor_number: u.floor_number,
          address_id: u.address_id,
          apartment_number: u.apartment_number
        },
        id: u.id,
        sub_categories_id: u.sub_categories_id,
        remark: u.remark
      });
    });

    res.status(200).json({ data: allSuppliers, message: 'findAllByUser' });

  }

  public updateSupplier = async (req: Request, res: Response, next: NextFunction) => {
    const supplierData: ISupplier = req.body;
    try {
      await this.supplierService.update(supplierData.id, supplierData);
      res.status(201).json({ data: supplierData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  public deleteSupplier = async (req: Request, res: Response, next: NextFunction) => {
    const supplierId : number = Number(req.params.id);
    try {
      const deleteSupplierData = await this.supplierService.delete(supplierId);
      res.status(200).json({ data: deleteSupplierData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }

}

export default SuppliersController;
