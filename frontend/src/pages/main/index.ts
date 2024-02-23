import { APP_PATHS } from '../../constants/AppPaths.ts';
import { IAppRoute } from '../../interfaces/app-route.ts';
import { MainPage } from './MainPage.tsx';

export const MainRoutes: IAppRoute[] = [
  { path: APP_PATHS.MAIN, element: MainPage },
];
