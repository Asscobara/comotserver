import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import { RequestWithUser } from '../interfaces/auth.interface';
import { IUser } from '../interfaces/users.interface';
import AuthService from '../services/auth.service';

class AuthController {
  public authService = new AuthService();

  public updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const signUpUserData: IUser = await this.authService.updatePassword(userData);
      res.status(201).json({ data: signUpUserData, message: 'password' });
    } catch (error) {
      next(error);
    }
  }

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const signUpUserData: IUser = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  }

  public verify = async (req: Request, res: Response, next: NextFunction) => { 
    try {
      const signUpUserData: IUser = await this.authService.verify(req.query);
      res.writeHead(301, {Location: 'http://localhost:4200/'} );
      res.end();
    } catch (error) {
      next(error);
    }
  }

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const { cookie, findUser } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  }

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userData: IUser = req.user;

    try {
      const logOutUserData: IUser = await this.authService.logout(userData);
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
