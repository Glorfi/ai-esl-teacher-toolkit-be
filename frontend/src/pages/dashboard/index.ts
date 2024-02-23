import { APP_PATHS } from '../../constants/AppPaths.ts';
import { IAppRoute } from '../../interfaces/app-route.ts';
import { DashboardPage } from './Dashboard.tsx';
import { DashboardExercisePage } from './DashboardExercise.tsx';

export const DashboardRoutes: IAppRoute[] = [
  { path: APP_PATHS.DASHBOARD, protected: true, element: DashboardPage },
  {
    path: APP_PATHS.DASHBOARD_EXERCISE,
    protected: true,
    element: DashboardExercisePage,
  },
];
