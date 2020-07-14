
export abstract class DBBase<T> {

    public constructor(public name: string) {

    }

    public abstract async get(id: number | string): Promise<T>;
    public abstract async create(data: T): Promise<T>;
    public abstract async update(data: T): Promise<T>; 
    public abstract async delete(id: number): Promise<T>;
    public abstract async getAll(): Promise<T[]>;

    private dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'comotdb',
        multipleStatements: true
    };

    public async initDB() {
        await this.deleteDB();
        await this.createDB();  
        await this.defaultsDB();
    }

    private async createDB() {
        console.log('creating tables...');
        await this.handleSQLFile('create.sql');
        console.log('done...');
    }

    private async deleteDB() {
        console.log('deleting tables...');
        await this.handleSQLFile('delete.sql');
        console.log('done...');
    }

    private async defaultsDB() {
        console.log('updating default valuess...');
        await this.handleSQLFile('defaults.sql');
        console.log('done...');
    }

    private async handleSQLFile(fileName: string) {
        let queries = await this.processSQLFile(`./src/services/db/sql/${fileName}`);
        let fullSql = '';
        queries.forEach( async (q: string) => {
            fullSql = `${fullSql}${q};`;            
        });

        await this.query(fullSql);
    }
    
    private async processSQLFile(fileName: string) {
    
        let fs = require('fs');
        return await fs.readFileSync(fileName).toString()
          .replace(/(\r\n|\n|\r)/gm," ") // remove newlines
          .replace(/\s+/g, ' ') // excess white space
          .split(";") // split into all statements
          .map(Function.prototype.call, String.prototype.trim)
          .filter(function(el: any) {return el.length != 0}); // remove any empty ones
    }

    private makeDb() {
    
        let mysql = require('mysql');
        let connection = mysql.createConnection(this.dbConfig);
    
        const util = require( 'util' );
    
        return {
            query ( sql: any, args?: any ) {
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
            console.log(`sql run return value = ${JSON.stringify(sqlReturn)}`);
            return sqlReturn;
        } catch(err) {
            console.error(`query error = ${JSON.stringify(err)}`);
            return null;
        }
    }
       
    protected async notImplemented() {
        return new Promise<any>((resolve) => resolve());
    }

}