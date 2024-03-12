import React from 'react';
import { APP_PATHS } from '../../constants/AppPaths.ts';
import { IAppRoute } from '../../interfaces/app-route.ts';
//import { SignInPage } from './SignInPage.tsx';
import { SignUpPage } from './SignUpPage.tsx';

const LazySignInPage = React.lazy(() => import('./SignInPage.tsx'))

export const AuthPagesRoutes: IAppRoute[] = [
  { path: APP_PATHS.SIGN_IN, element: LazySignInPage},
  { path: APP_PATHS.SIGN_UP, element: SignUpPage },
];
