import { RouteConfig } from '../types';
import routeNames from './routeNames';
import HomePage from './HomePage';
import CreateAccountPage from './CreateAccountPage';
import AccountListPage from './AccountListPage';
import TransferPage from './TransferPage';
import NotFoundPage from './NotFoundPage';

const routerConfig: RouteConfig[] = [
  {
    path: routeNames.home,
    component: HomePage,
    id: 1,
  },
  {
    path: routeNames.createAccount,
    component: CreateAccountPage,
    id: 2,
  },
  {
    path: routeNames.accountList,
    component: AccountListPage,
    id: 3,
  },
  {
    path: routeNames.transferFunds,
    component: TransferPage,
    id: 4,
  },
  {
    path: routeNames.notFound,
    component: NotFoundPage,
    id: 5,
  },
];

export default routerConfig;
