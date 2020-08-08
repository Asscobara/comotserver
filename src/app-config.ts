

const all_configuration = {    
    dev: {
        app: {
            port: 666        
        },
        db: {
            host: 'localhost',
            user: 'root',
            password: '12345678',
            database: 'comotdb',
            multipleStatements: true
       } 
    },
    prod: {
        app: {
            port: 3000
        },
        db: {
            host: '31.170.166.129',
            user: 'u376266110_assc',
            password: 'Bagay1bagay!',
            database: 'u376266110_comotdb',
            multipleStatements: true
        }
    }
}

class Configuration { 

    public static active = all_configuration.dev;
    public static init(env: string) {
        if (env == 'production') {
            Configuration.active = all_configuration.prod;
        } 
    }
}

export default Configuration;