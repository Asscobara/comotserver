import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import { IUser } from '../interfaces/users.interface';
import userService from '../services/users.service';
import User from '../services/db/user';

class UsersController {
  public userService = new User(`user`);

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: IUser[] = await this.userService.getAll();
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  }

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = Number(req.params.id);

    try {
      const findOneUserData: IUser = await this.userService.get(userId);
      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  }

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    const userData: IUser = req.body;

    try {
      const createUserData: IUser = await this.userService.create(userData);
      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userData: IUser = req.body;
    try {
      const updateUserData: IUser[] = await this.userService.update(userData);
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId : number = Number(req.params.id);

    try {
      const deleteUserData: IUser[] = await this.userService.delete(userId);
      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;
