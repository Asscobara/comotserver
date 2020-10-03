import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import ConfigurationController from '../controllers/configuration.controller';
import { CreateConfigurationDto } from '../dtos/configuration.dto';

class ConfigurationRoute implements Route {
  public path = '/configuration';
  public router = Router();
  public configurationController = new ConfigurationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, this.configurationController.getConfigurationByAddressId);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateConfigurationDto, true), this.configurationController.updateConfiguration);
    this.router.delete(`${this.path}/:id(\\d+)`, this.configurationController.deleteConfiguration);
  }
}

export default ConfigurationRoute;
