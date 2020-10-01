import * as bcrypt from 'bcrypt';
import HttpException from '../exceptions/HttpException';
import { IUser } from '../interfaces/users.interface';
import { isEmptyObject } from '../utils/util';
import { DBBase } from './db/db';

abstract class BaseService<I, T extends DBBase<I>> {

  protected db: DBBase<I>;
  
  protected abstract createDb(): DBBase<I>;

  constructor() {      
     this.db = this.createDb();   
  }   

  public async get(id: number): Promise<I> {
    return await this.db.get(id);
  }

  public async findAll(): Promise<I[]> {
    const all: I[] = await this.db.getAll();
    return all;
  }

  public async findById(id: number): Promise<I> {
    const all: I[] = await this.db.getAll();
    const find: I = all.find(o => (o as any).id === id);
    if (!find) throw new HttpException(409, `You're not ${this.db.name}`);
    return find;
  }

  public async create(data: any): Promise<I> {    
    if (isEmptyObject(data)) throw new HttpException(400, `You're not data - ${this.db.name}`);
    return this.db.create(data);
  }

  public async update(id: number, data: any): Promise<I> {
    
    if (isEmptyObject(data as any)) throw new HttpException(400, `You're not data ${this.db.name}`);

    const all: I[] = await this.db.getAll();
    const find: I = all.find(o => (o as any).id === id);
    if (!find) throw new HttpException(409, `You're not ${this.db.name}`);
    
    return this.db.update(data);
  }

  public async delete(id: number): Promise<I> {
    const all: I[] = await this.db.getAll();
    const find: I = all.find(o => (o as any).id === id);
    if (!find) throw new HttpException(409, `You're not ${this.db.name}`);
    return this.db.delete((find as any).id);
  }
}

export default BaseService;
