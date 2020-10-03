import { NextFunction, Request, Response } from 'express';
import { IAlert, IConfiguration } from '../interfaces/users.interface';
import ConfigurationService from '../services/configuration.service';

class ConfigurationController {
  
  public configurationService = new ConfigurationService();

  public getConfigurationByAddressId = async (req: Request, res: Response, next: NextFunction) => {
    const addressId: number = Number(req.params.id);

    try {
      const configuration: IConfiguration = await this.configurationService.getByAddress(addressId);
      res.status(200).json({ data: configuration, message: 'getConfigurationByAddress' });
    } catch (error) {
      next(error);
    }
  }

  public deleteConfiguration = async (req: Request, res: Response, next: NextFunction) => {
    const configurationId : number = Number(req.params.id);

    try {
      const deleteConfigurationData: IConfiguration = await this.configurationService.delete(configurationId);
      res.status(200).json({ data: deleteConfigurationData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }

  public updateConfiguration = async (req: Request, res: Response, next: NextFunction) => {
    const configurationData: IConfiguration = req.body;
    try {
      const updatedConfigurationData: IConfiguration = await this.configurationService.updateConfiguration(configurationData);
      res.status(200).json({ data: updatedConfigurationData, message: 'updatedConfiguration' });
    } catch (error) {
      next(error);
    }
  }
 
}

export default ConfigurationController;
