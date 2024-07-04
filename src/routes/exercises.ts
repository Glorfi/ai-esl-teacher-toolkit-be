import express from 'express';
import {
  addTopicToExercise,
  createExercise,
  deleteExercise,
  generateExercise,
  getExerciseByID,
  getUserExercises,
  removeTopicFromExercise,
  updateExercise,
} from '../controllers/exercises.js';
import { auth } from '../middlewares/auth.js';
import { logUserActivity } from '../middlewares/userActivityLogger.js';

const exsRouter = express.Router();

exsRouter.get('/:id', getExerciseByID);
exsRouter.get('/', auth, getUserExercises);
exsRouter.post('/', auth, createExercise);
exsRouter.post('/generate', auth, generateExercise);
exsRouter.put('/:id', auth, updateExercise);
exsRouter.delete('/:id', auth, deleteExercise);
exsRouter.post('/topics', auth, addTopicToExercise);
exsRouter.delete(
  '/:exId/topics/:topicId',
  auth,
  logUserActivity,
  removeTopicFromExercise
);

export default exsRouter;
