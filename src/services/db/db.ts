import User from "./user";

export abstract class DBBase<T> {

    public constructor(public name: string) {

    }

    public abstract async get(id: number | string): Promise<T>;
    public abstract async create(data: T): Promise<T>;
    public abstract async update(data: T): Promise<T>; 
    public abstract async delete(id: number): Promise<T>;
    public abstract async getAll(): Promise<T[]>;

    public async initDB() {
        await this.deleteDB();
        await this.createDB();   
        await this.defaultsDB();
    }
 
    private async createDB() {
        console.log('creating tables...');
        this.handleSQLFile('create.sql');
    }

    private async deleteDB() {
        console.log('deleting tables...');
        this.handleSQLFile('delete.sql');
    }

    private async defaultsDB() {
        console.log('updating default valuess...');
        await this.handleSQLFile('defaults.sql');
    }

    private async handleSQLFile(fileName: string) {
        let queries = this.processSQLFile(`./src/services/db/sql/${fileName}`);
        queries.forEach( async (q: string) => {
            await this.query(q);
        });
    }
    
    private processSQLFile(fileName: string) {
    
        let fs = require('fs');
        return fs.readFileSync(fileName).toString()
          .replace(/(\r\n|\n|\r)/gm," ") // remove newlines
          .replace(/\s+/g, ' ') // excess white space
          .split(";") // split into all statements
          .map(Function.prototype.call, String.prototype.trim)
          .filter(function(el: any) {return el.length != 0}); // remove any empty ones
    }
    
    private makeDb() {
    
        let mysql = require('mysql');
    
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345678',
            database: 'comotdb'
        });
    
        const util = require( 'util' );
    
        return {
          query( sql: any, args?: any ) {
            return util.promisify( connection.query )
              .call( connection, sql, args );
          },
          close() {
            return util.promisify( connection.end ).call( connection );
          }
        };
    }
    
    protected async query(sql: string) {
        let db = this.makeDb();
        console.log(`executing sql: ${sql}`);
        try {
            const sqlReturn =  await db.query(sql);
            await db.close();    
            return sqlReturn;
        } catch(err) {
            console.error(`query error = ${JSON.stringify(err)}`);
            return null;
        }

    }

}