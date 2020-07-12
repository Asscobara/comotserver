import { NextFunction, Request, Response } from 'express';
import { IPrice } from '../interfaces/users.interface';
import PriceListService from '../services/priceList.service';

class PriceListController {

  public priceListService = new PriceListService();

  public createPrice = async (req: Request, res: Response, next: NextFunction) => {
    const priceData: IPrice = req.body;

    try {
      await this.priceListService.create(priceData);
      res.status(201).json({ data: priceData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public findAllPriceList = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const priceData: IPrice[] = await this.priceListService.findAll();
        res.status(200).json({ data: priceData, message: 'findAllPriceList' });
    } catch(error) {
        next(error);
    }   
 }

 public updatePrice = async (req: Request, res: Response, next: NextFunction) => {
    const priceData: IPrice = req.body;
    try {
      await this.priceListService.update(priceData.id, priceData);
      res.status(201).json({ data: priceData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  public deletePrice = async (req: Request, res: Response, next: NextFunction) => {
    const priceId : number = Number(req.params.id);

    try {
      const deletePriceData = await this.priceListService.delete(priceId);
      res.status(200).json({ data: deletePriceData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }
 
}

export default PriceListController;
