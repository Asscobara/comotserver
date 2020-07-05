import { NextFunction, Request, Response } from 'express';
import { ITransaction } from '../interfaces/users.interface';

import TransactionService from '../services/transaction.service';
import AddressService from '../services/address.service';

class TransactionController {
  
  public transactionService = new TransactionService();
  public addressService = new AddressService;

  public createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const transactionData: ITransaction = req.body;

    try {
      const createTransactionData: ITransaction = await this.transactionService.create(transactionData);
      res.status(201).json({ data: createTransactionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public getAddressTransactions = async (req: Request, res: Response, next: NextFunction) => {
    const addressId: number = Number(req.params.id);
    const address = await this.addressService.findById(addressId);
    try {
      const transactionData: ITransaction[] = await this.transactionService.getAddressTransacions(address);
      res.status(200).json({ data: transactionData, message: 'findByAddress' });
    } catch (error) {
      next(error);
    }
  }


}

export default TransactionController;
