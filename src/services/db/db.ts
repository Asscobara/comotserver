export abstract class DBBase<T> {

    public constructor(public name: string) {

    }

    public abstract async get(id: number | string): Promise<T>;
    public abstract async create(data: T): Promise<T>;
    public abstract async update(data: T): Promise<T>; 
    public abstract async delete(id: number): Promise<T>;
    public abstract async getAll(): Promise<T[]>;

    public createMock() {
        let queries = this.processSQLFile('./db/sql/mock.sql');
        queries.forEach( (q: string) => {
            this.query(q);
        });
    }
    
    public createDB() {
        let queries = this.processSQLFile('./db/sql/create.sql');
        queries.forEach( (q: string) => {
            this.query(q);
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
        return await db.query(sql)
    }

}