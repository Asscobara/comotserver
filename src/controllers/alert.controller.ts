import { NextFunction, Request, Response } from 'express';
import { IAlert } from '../interfaces/users.interface';
import AlertService from '../services/alert.service';

class AlertController {
  
  public alertService = new AlertService();

  public getAlertsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = Number(req.params.id);

    try {
      const alerts: IAlert[] = await this.alertService.findByUserId(userId);
      res.status(200).json({ data: alerts, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  }
}

export default AlertController;
