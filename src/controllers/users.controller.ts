import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/users.interface';

import UserService from '../services/users.service';

class UsersController {
  public userService = new UserService();

  public findAllRelatedUsers = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = Number(req.params.id);
    const userData: IUser = await this.userService.findUserById(userId);
    const findAllUsersData: IUser[] = await this.userService.findAllRelatedUsers(userData);
    res.status(200).json({ data: findAllUsersData, message: 'findAllByUser' });
  }
  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: IUser[] = await this.userService.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  }

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = Number(req.params.id);

    try {
      const findOneUserData: IUser = await this.userService.findUserById(userId);
      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  }

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    const userData: IUser = req.body;

    try {
      const createUserData: IUser = await this.userService.createUser(userData);
      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userData: IUser = req.body;
    try {
      const updateUserData: IUser[] = await this.userService.updateUser(userData.id, userData);
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId : number = Number(req.params.id);

    try {
      const deleteUserData: IUser[] = await this.userService.deleteUser(userId);
      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }

  public updateRole = async (req: Request, res: Response, next: NextFunction) => {
    const userData: IUser = req.body;
    try {
      const updatedUserData: IUser = await this.userService.updateRole(userData);
      res.status(200).json({ data: updatedUserData, message: 'updatedRole' });
    } catch (error) {
      next(error);
    }
  }

}

export default UsersController;
