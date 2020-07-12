import { NextFunction, Request, Response } from 'express';
import { ISubCategory } from '../interfaces/users.interface';
import SubCategoriesService from '../services/subCategories.service';

class SubCategoriesController {

  public subCategoriesService = new SubCategoriesService();

  public createSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    const subCategoryData: ISubCategory = req.body;

    try {
      await this.subCategoriesService.create(subCategoryData);
      res.status(201).json({ data: subCategoryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public findAllSubCategories = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const subCategoryData: ISubCategory[] = await this.subCategoriesService.findAll();
        res.status(200).json({ data: subCategoryData, message: 'findAllSubCategories' });
    } catch(error) {
        next(error);
    }   
 }

 public updateSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    const subCategoryData: ISubCategory = req.body;
    try {
      await this.subCategoriesService.update(subCategoryData.id, subCategoryData);
      res.status(201).json({ data: subCategoryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  public deleteSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    const subCategoryId : number = Number(req.params.id);

    try {
      const deleteSubCategoryData = await this.subCategoriesService.delete(subCategoryId);
      res.status(200).json({ data: deleteSubCategoryData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }
 
}

export default SubCategoriesController;
