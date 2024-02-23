import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { AppRoutes } from './pages/RoutesConfig';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
} from './store/main-api/queries/auth';
import { LSHandler } from './utils/handleLocalStorage';
import { APP_PATHS } from './constants/AppPaths';
import { useDispatch } from 'react-redux';
import { addExerciseList } from './store/exerciseList/exercise-list-router';
import { MainPage } from './pages/main/MainPage';

function App() {
  const [user, setUserData] = useContext(UserContext);
  const jwt = LSHandler.getJwt();
  const { data, isLoading } = useGetCurrentUserQuery(jwt);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (data) {
      setUserData(data);
      dispatch(addExerciseList(data.exercises));
    }
  }, [data]);

  if (isLoading) {
    return <></>;
  }

  return (
    <Routes>
      {AppRoutes.map((route, index) => (
        <Route
          key={`${route.path}-${index}`}
          path={route.path}
          element={
            route.protected && !data ? (
              // Если пользователь не залогинен и маршрут защищенный, перенаправляем на страницу входа
              <Navigate to={APP_PATHS.SIGN_IN} replace />
            ) : (
              // Иначе, рендерим соответствующий элемент маршрута
              <route.element />
            )
          }
        />
      ))}
    </Routes>
  );
}

export default App;
