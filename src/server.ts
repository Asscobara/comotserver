import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import AddressRoute from './routes/address.route';
import validateEnv from './utils/validateEnv';
import TransactionRoute from './routes/transaction.route';
import SuppliersRoute from './routes/suppliers.route';
import CategoriesRoute from './routes/categories.route';
import SubCategoriesRoute from './routes/subCategories.route';
import PriceListRoute from './routes/priceList.route';
import TaskRoute from './routes/tasks.route';
import MailRoute from './routes/mail.route';
import ReportsRoute from './routes/reports.route';
import Configuration from './app-config';

console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`); 
Configuration.init(process.env.NODE_ENV);

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new AddressRoute(),
  new TransactionRoute(),
  new SuppliersRoute(),
  new CategoriesRoute(),
  new SubCategoriesRoute(),
  new PriceListRoute(),
  new TaskRoute(),
  new MailRoute(),
  new ReportsRoute()
]);

app.listen();
