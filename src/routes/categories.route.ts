import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import CategoriesController from '../controllers/categories.controller';
import { CreateCategoryDto } from '../dtos/category.dto';

class CategoriesRoute implements Route {
  public path = '/categories';
  public router = Router();
  public categoriesController = new CategoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.categoriesController.findAllCategories);
    this.router.post(`${this.path}`, validationMiddleware(CreateCategoryDto), this.categoriesController.createCategory);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateCategoryDto, true), this.categoriesController.updateCategory);
    this.router.delete(`${this.path}/:id(\\d+)`, this.categoriesController.deleteCategory);
  }
}

export default CategoriesRoute;
