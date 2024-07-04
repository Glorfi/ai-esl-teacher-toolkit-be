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
exsRouter.get('/', auth, logUserActivity, getUserExercises);
exsRouter.post('/', auth, logUserActivity, createExercise);
exsRouter.post('/generate', auth, logUserActivity, generateExercise);
exsRouter.put('/:id', auth, updateExercise);
exsRouter.delete('/:id', auth, logUserActivity, deleteExercise);
exsRouter.post('/topics', auth, logUserActivity, addTopicToExercise);
exsRouter.delete(
  '/:exId/topics/:topicId',
  auth,
  logUserActivity,
  removeTopicFromExercise
);

export default exsRouter;
