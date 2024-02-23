import { IAppRoute } from '../interfaces/app-route';
import { AuthPagesRoutes } from './authpages';
import { DashboardRoutes } from './dashboard';
import { MainRoutes } from './main';
import { SharedRoutes } from './share';

export const AppRoutes: IAppRoute[] = [
  ...MainRoutes,
  ...AuthPagesRoutes,
  ...DashboardRoutes,
  ...SharedRoutes,
];
