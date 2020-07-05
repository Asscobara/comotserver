import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import AddressRoute from './routes/address.route';
import validateEnv from './utils/validateEnv';
import TransactionRoute from './routes/transaction.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new AddressRoute(),
  new TransactionRoute()
]);

app.listen();
