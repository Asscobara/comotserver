import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import userModel from '../models/users.model';
import { isEmptyObject } from '../utils/util';
import { IUser } from 'interfaces/users.interface';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<IUser> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: IUser = this.users.find(user => user.email === userData.email);
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: IUser = { id: (this.users.length + 1), ...userData, password: hashedPassword };

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string, findUser: IUser }> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: IUser = this.users.find(user => user.email === userData.email);
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: IUser): Promise<IUser> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: IUser = this.users.find(user => user.password === userData.password);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: IUser): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
