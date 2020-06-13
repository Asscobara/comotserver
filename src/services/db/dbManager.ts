import { User } from './user';
import { DBBase } from './db';

export class DBManager {
    
    public get user() {
        return this.dbModels[Models_Names.user];
    }

    private dbModels: { [name: string]: DBBase<any> } = {};

    public constructor() {
        this.initModels();
    }

    private initModels() {
        this.addModel( new User(Models_Names.user) );
    }

    private addModel(model: DBBase<any>) {
        this.dbModels[model.name] = model;
    }
        
}

export enum Models_Names {
    user = 'user'
}