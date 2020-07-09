import { NextFunction, Request, Response } from 'express';
import { ICategory } from '../interfaces/users.interface';
import CategoriesService from '../services/categories.service';

class CategoriesController {

  public categoriesService = new CategoriesService();

  public createCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryData: ICategory = req.body;

    try {
      await this.categoriesService.create(categoryData);
      res.status(201).json({ data: categoryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public findAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const categoriesData: ICategory[] = await this.categoriesService.findAll();
        res.status(200).json({ data: categoriesData, message: 'findAllCategories' });
    } catch(error) {
        next(error);
    }   
 }

 public updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryData: ICategory = req.body;
    try {
      await this.categoriesService.update(categoryData.id, categoryData);
      res.status(201).json({ data: categoryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  public deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId : number = Number(req.params.id);

    try {
      const deleteUserData = await this.categoriesService.delete(categoryId);
      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }
 
}

export default CategoriesController;
