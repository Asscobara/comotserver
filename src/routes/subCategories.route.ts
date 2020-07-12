import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { CreateSubCategoryDto } from '../dtos/subCategory.dto';
import SubCategoriesController from '../controllers/subCategories.controller';

class SubCategoriesRoute implements Route {
  public path = '/subcategories';
  public router = Router();
  public subCategoriesController = new SubCategoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.subCategoriesController.findAllSubCategories);
    this.router.post(`${this.path}`, validationMiddleware(CreateSubCategoryDto), this.subCategoriesController.createSubCategory);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateSubCategoryDto, true), this.subCategoriesController.updateSubCategory);
    this.router.delete(`${this.path}/:id(\\d+)`, this.subCategoriesController.deleteSubCategory);
  }
}

export default SubCategoriesRoute;
