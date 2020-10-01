import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as logger from 'morgan';
import Routes from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import User from './services/db/user';
import Configuration from './app-config';
import PaymentsJob from './jobs/payments.job';
import BaseJob from './jobs/base.job';
import EventsJob from './jobs/events.job';

class App {
  public app: express.Application;
  public port: (string | number);
  public env: boolean;
  private jobs: BaseJob[];
  constructor(routes: Routes[]) {

    this.app = express();
    this.port = Configuration.active.app.port;
    this.env = process.env.NODE_ENV === 'production' ? true : false;    
    
    if (process.env.NODE_ENV !== 'initDb') {
      this.initializeMiddlewares();
      this.initializeRoutes(routes);
      this.initializeSwagger();
      this.initializeErrorHandling();
      this.initializeJobs();
    }
  }

  public listen() {
    if (process.env.NODE_ENV === 'initDb') {
      console.log(`--> INIT DB`);
      const d = new User('initDb');
      d.initDB();
    } else {
      this.app.listen(this.port, () => {
        console.log(`🚀 App listening on the port ${this.port}`);
      });
    } 
  }

  public getServer() {
    return this.app;
  }
  
  private initializeJobs() {
    this.jobs = [];
    this.jobs.push(new PaymentsJob());
    this.jobs.push(new EventsJob());    
  }

  private initializeMiddlewares() {
    if (this.env) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(logger('combined'));
      this.app.use(cors({ 
        origin: [
          'http://comot.co.il', 
          'http://www.comot.co.il'
        ], 
        credentials: true 
      }));
    } else {
      this.app.use(logger('dev'));
      this.app.use(cors());
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }
  private initializeSwagger() {
    const swaggerJSDoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
