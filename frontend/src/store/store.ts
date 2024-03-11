import { configureStore } from '@reduxjs/toolkit';
import { gptApi } from './gpt-api/gpt.api';
import { ExerciseFormRouter } from './exercise-form/exercise-form-router';
import { mainApi } from './main-api/MainApiRouter.api';
import { exerciseListRouter } from './exerciseList/exercise-list-router';
import { isEditingRouter } from './isEditing/isEditing-router';

export const store = configureStore({
  reducer: {
    [ExerciseFormRouter.name]: ExerciseFormRouter.reducer,
    [exerciseListRouter.name]: exerciseListRouter.reducer,
    [isEditingRouter.name]: isEditingRouter.reducer,
    [gptApi.reducerPath]: gptApi.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gptApi.middleware, mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
