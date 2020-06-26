import { NextFunction, Request, Response } from 'express';
import { IAddress } from '../interfaces/users.interface';

import AddressService from '../services/address.service';

class AddressController {
  
  public addressService = new AddressService();

  public getAddressByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = Number(req.params.id);

    try {
      const addressData: IAddress = await this.addressService.findByUserId(userId);
      res.status(200).json({ data: addressData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  }

  public createAddress = async (req: Request, res: Response, next: NextFunction) => {
    const addressData: IAddress = req.body;

    try {
      const createAddressData: IAddress = await this.addressService.create(addressData);
      res.status(201).json({ data: createAddressData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public updateAdress = async (req: Request, res: Response, next: NextFunction) => {
    const addressData: IAddress = req.body;
    try {
      const updateAdressData: IAddress = await this.addressService.update(addressData.id, addressData);
      res.status(200).json({ data: updateAdressData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  public deleteAdress = async (req: Request, res: Response, next: NextFunction) => {
    const addressId : number = Number(req.params.id);

    try {
        const deleteAddressData: IAddress = await this.addressService.delete(addressId);
        res.status(200).json({ data: deleteAddressData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default AddressController;
