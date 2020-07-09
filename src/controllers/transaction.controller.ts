import { NextFunction, Request, Response } from 'express';
import { ITransaction } from '../interfaces/users.interface';

import TransactionService from '../services/transaction.service';
import AddressService from '../services/address.service';
import ReciptService from '../services/recipt.service';
import { CreateReciptDto } from '../dtos/recipt.dto';
import { v4 as uuid } from 'uuid';

class TransactionController {
  
  public transactionService = new TransactionService();
  public addressService = new AddressService;

  public createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const transactionData: ITransaction = req.body;

    try {
      const createTransactionData: ITransaction = await this.transactionService.create(transactionData);
      const reciptSrv = new ReciptService();
      const reciptDto = new CreateReciptDto();

      reciptDto.date_time = new Date();
      reciptDto.email_sent = transactionData.send_recipt;
      reciptDto.user_id = transactionData.user_id;
      reciptDto.recipt_number = uuid();
      
      await reciptSrv.createRecipt(reciptDto, transactionData, transactionData.send_recipt)

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

  public updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const transactionData: ITransaction = req.body;
    try {
      const updateAdressData: ITransaction = await this.transactionService.update(transactionData.id, transactionData);
      res.status(200).json({ data: updateAdressData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }


}

export default TransactionController;
