import { configureStore } from '@reduxjs/toolkit';
import { dummyApi } from './dummy-api/dummy.api';
import { gptApi } from './gpt-api/gpt.api';
import { ExerciseFormRouter } from './exercise-form/exercise-form-router';
import { mainApi } from './main-api/MainApiRouter.api';
import { exerciseListRouter } from './exerciseList/exercise-list-router';

export const store = configureStore({
  reducer: {
    [ExerciseFormRouter.name]: ExerciseFormRouter.reducer,
    [exerciseListRouter.name]: exerciseListRouter.reducer,
    [dummyApi.reducerPath]: dummyApi.reducer,
    [gptApi.reducerPath]: gptApi.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dummyApi.middleware,
      gptApi.middleware,
      mainApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
