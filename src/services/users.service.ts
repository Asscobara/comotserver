import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { IUser } from '../interfaces/users.interface';
import { isEmptyObject } from '../utils/util';
import User from './db/user';
import EmailService from './email/email.service';
import Address from './db/address';

class UserService {

  public users = new User('user');
  
  public async findAllRelatedUsersByRole(user: IUser | number, roleId: number): Promise<IUser[]> {
    const users: IUser[] = await this.users.getAllRelatedUsersByRole(user, roleId);
    return users;
  }

  public async findAllRelatedUsers(user: IUser | number): Promise<IUser[]> {
    const users: IUser[] = await this.users.getAllRelatedUsers(user);
    return users;
  }

  public async findAllUser(): Promise<IUser[]> {
    const users: IUser[] = await this.users.getAll();
    return users;
  }

  public async findUserById(userId: number): Promise<IUser> {
    const users: IUser[] = await this.users.getAll();
    const findUser: IUser = users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<IUser> {
    const users: IUser[] = await this.users.getAll();
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: IUser = users.find(user  => user.email === userData.email);
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: IUser = { ...userData, password: hashedPassword };

    const updatedData = await this.users.create(createUserData);
    const newUser = await this.users.get(updatedData.insertId);

    const url = await this.users.getVerificationUrl(newUser[0]);
    EmailService.sendVerificationEmail(newUser[0], url);
    // new manager - send email to myself 
    if (newUser[0].roleId == 2) {
      EmailService.sendGeneralMessage({emails:['asscobara@gmail.com'], message: `New manager registered ${JSON.stringify(newUser[0])}`});
    }
    return newUser;
  }

  public async updateUser(userId: number, userData: IUser): Promise<IUser[]> {
    const users: IUser[] = await this.users.getAll();
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: IUser = users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "You're not user");
    
    return this.users.update(userData);
  }

  public async deleteUser(userId: number): Promise<IUser[]> {
    return this.users.delete(userId);
  }

  public async updateRole(user: IUser) {
    if (!user) throw new HttpException(409, "You're not user");
    const update = await this.users.updateRole(user);
    if (!update) throw new HttpException(409, "update role fail");

    return update;
  }
}

export default UserService;
