import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

import TransactionController from '../controllers/transaction.controller';
import { CreateTransactionDto } from '../dtos/transaction.dto';

class TransactionRoute implements Route {
  public path = '/transactions';
  public router = Router();
  public transactionController = new TransactionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, this.transactionController.getAddressTransactions);
    this.router.post(`${this.path}`, validationMiddleware(CreateTransactionDto), this.transactionController.createTransaction);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateTransactionDto, true), this.transactionController.updateTransaction);
  }
}

export default TransactionRoute;
