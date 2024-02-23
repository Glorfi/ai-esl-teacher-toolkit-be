import express from 'express';
import {
  createExercise,
  deleteExercise,
  getExerciseByID,
  getUserExercises,
} from '../controllers/exercises.js';
import { auth } from '../middlewares/auth.js';

const exsRouter = express.Router();

exsRouter.get('/:id', getExerciseByID)
exsRouter.get('/', auth, getUserExercises);
exsRouter.post('/', auth, createExercise);
exsRouter.delete('/:id', auth, deleteExercise);

export default exsRouter;
