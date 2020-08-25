const all_configuration = {    
    dev: {
        app: {
            port: 3000,
            server: 'http://localhost:3000'   
        },
        db: {
            host: 'localhost',
            user: 'root',
            password: '12345678',
            database: 'comotdb',
            multipleStatements: true
        },
        mail: {
            host: 'smtp.hostinger.co.il',
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: 'admin@comot.co.il',
                pass: 'Bagay1bagay!'
            } 
        },        
    },
    prod: {
        app: {
            port: 666,
            server: 'http://45.80.152.140:666'
        },
        db: {
            host: '31.170.166.129',
            user: 'u376266110_assc',
            password: 'Bagay1bagay!',
            database: 'u376266110_comotdb',
            multipleStatements: true
        },
        mail: {
            host: 'smtp.hostinger.co.il',
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: 'admin@comot.co.il',
                pass: 'Bagay1bagay!'
            }
        },
    }
};

class Configuration { 

    public static active = all_configuration.dev;
    public static init(env: string) {
        if (env == 'production') {
            Configuration.active = all_configuration.prod;
        } 
    }
}

export default Configuration;