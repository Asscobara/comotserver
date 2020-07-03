import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { isEmptyObject } from '../utils/util';
import { IUser } from 'interfaces/users.interface';
import User from './db/user';
import EmailService from './email/email.service';

class AuthService {
  public users = new User(`authUser`);

  public async verify(reqParams: any): Promise<IUser> {

    const id = reqParams?.id;
    if (!id) throw new HttpException(409, `verify user has no id`);

    const key = reqParams?.key;
    if (!key) throw new HttpException(409, `verify user has no key`);

    const findUser: IUser = await this.users.get(id);
    if (!findUser) throw new HttpException(409, `verify user does not exists`);

    const currentKey = await this.users.getRegistrationKey(id);
    if (currentKey[0].registration_key !== key) throw new HttpException(409, `verify user key does not match`);

    await this.users.register(id);
  
    return findUser;
  }

  public async signup(userData: CreateUserDto): Promise<IUser> {
    const users: IUser[] = await this.users.getAll();
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: IUser = users.find(user => user.email === userData.email);
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: IUser = { ...userData, password: hashedPassword };

    const createRes = await this.users.create(createUserData);
    const newUser = await this.users.get(createRes.insertId);

    const url = await this.users.getVerificationUrl(newUser[0]);
    EmailService.sendVerificationEmail(newUser[0], url);
   
    return newUser;

  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string, findUser: IUser }> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const users: IUser[] = await this.users.getAll();
    const findUser: IUser = users.find(user => user.email === userData.email);
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`, 1002);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, `You're password not matching ${userData.password} <-> ${findUser.password}`, 1001);

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);
    //TODO: add loggedin/ loggedin datetime to user - update

    return { cookie, findUser };
  }

  public async logout(userData: IUser): Promise<IUser> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");
    
    const users: IUser[] = await this.users.getAll();
    const findUser: IUser = users.find(user => user.password === userData.password);
    if (!findUser) throw new HttpException(409, "You're not user");
    //TODO: add loggedin/ loggedin datetime to user - update
    return findUser;
  }

  public createToken(user: IUser): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60;
    console.log(`dataStoredInToken = ${JSON.stringify(dataStoredInToken)}, secret = ${JSON.stringify(secret)}`)
    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public async updatePassword(userData: IUser): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: IUser = { ...userData, password: hashedPassword };

    const updatedData = await this.users.updatePassword(createUserData);
    const newUser = await this.users.get(updatedData.insertId);

    //TODO: EmailService.sendPasswordChangedEmail(newUser[0]);

    return newUser;
  }
}

export default AuthService;
