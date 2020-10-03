import { NextFunction, Request, Response } from 'express';
import { IAddress } from '../interfaces/users.interface';

import AddressService from '../services/address.service';
import ConfigurationService from '../services/configuration.service';
import { printDebug } from '../utils/util';

class AddressController {
  
  public addressService = new AddressService();
  public configurationService = new ConfigurationService();

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
      ConfigurationService
      const createAddressData: IAddress = await this.addressService.create(addressData);
      // printDebug(`***************************** createAddressData`, createAddressData);      
      await this.configurationService.createAddressConfig( (createAddressData as any).insertId);
      res.status(201).json({ data: createAddressData, message: 'address created with configuration' });
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
