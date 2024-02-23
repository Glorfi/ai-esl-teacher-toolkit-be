import { APP_PATHS } from '../../constants/AppPaths.ts';
import { IAppRoute } from '../../interfaces/app-route.ts';
import { SharedExercisePage } from './SharedExercisePage.tsx';

export const SharedRoutes: IAppRoute[] = [
  { path: APP_PATHS.SHARED_EXERCISE, element: SharedExercisePage },
];
