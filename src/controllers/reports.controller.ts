
import { NextFunction, Request, Response } from 'express';
import ReportsService from '../services/reports.service';
import UsersService from '../services/users.service';

class ReportsController {

  public reportsService = new ReportsService();
  public usersService = new UsersService();


  public getTotalPaymentSummary = async (req: Request, res: Response, next: NextFunction) => {
      
    const addressId: number = Number(req.params.id);
    const from_date: string = req.params.from_date;

    try {        
        const paymentsStatus = await this.reportsService.getTotalPaymentSummary(addressId, from_date)
        res.status(201).json({ data: paymentsStatus, message: 'totalPaymentSummary' });
    } catch (error) {
        next(error);
    }
  }

  public getPaymentsStatus = async (req: Request, res: Response, next: NextFunction) => {
    
    const addressId: number = Number(req.params.id);
    const from_date: string = req.params.from_date;

    try {        
        const paymentsStatus = await this.reportsService.getPaymentsStatus(addressId, from_date)
        for(let i=0; i < paymentsStatus.length; i++) {         
          paymentsStatus[i].user_id = (await this.usersService.users.get(paymentsStatus[i].user_id as any))[0];         
        }
        res.status(201).json({ data: paymentsStatus, message: 'paymentsStatus' });
    } catch (error) {
        next(error);
    }
  }

  public getSupliersReport = async (req: Request, res: Response, next: NextFunction) => {
    
    const addressId: number = Number(req.params.id);

    try {        
        const paymentsStatus = await this.reportsService.getSupliersReport(addressId)
        res.status(201).json({ data: paymentsStatus, message: 'paymentsStatus' });
    } catch (error) {
        next(error);
    }
  }


  public getTasksReport = async (req: Request, res: Response, next: NextFunction) => {
    
    const addressId: number = Number(req.params.id);

    try {        
        const tasks = await this.reportsService.getTasksReport(addressId);
        res.status(201).json({ data: tasks, message: 'tasksStatus' });
    } catch (error) {
        next(error);
    }
  }

}

export default ReportsController;
