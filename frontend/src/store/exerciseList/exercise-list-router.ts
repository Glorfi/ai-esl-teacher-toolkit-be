import {
  createAction,
  createReducer,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { IExercise } from '../../interfaces/exercise';

const initialState: IExercise[] = [];

const addExerciseListAction = (
  state: IExercise[],
  action: PayloadAction<IExercise[]>
) => {
  return [...state, ...action.payload];
};

const removeExerciseAction = (
  state: IExercise[],
  action: PayloadAction<string>
) => {
  return state.filter((item) => item._id !== action.payload);
};

const addExerciseAction = (
  state: IExercise[],
  action: PayloadAction<IExercise>
) => {
  return [...state, action.payload];
};

export const exerciseListRouter = createSlice({
  name: 'exerciseList',
  initialState,
  reducers: {
    addExerciseList: addExerciseListAction,
    removeExercise: removeExerciseAction,
    addExercise: addExerciseAction,
  },
});

export const { addExerciseList, removeExercise, addExercise } =
  exerciseListRouter.actions;
