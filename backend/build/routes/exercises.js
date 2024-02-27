import express from 'express';
import { createExercise, deleteExercise, generateExercise, getExerciseByID, getUserExercises, } from '../controllers/exercises.js';
import { auth } from '../middlewares/auth.js';
const exsRouter = express.Router();
exsRouter.get('/:id', getExerciseByID);
exsRouter.get('/', auth, getUserExercises);
exsRouter.post('/', auth, createExercise);
exsRouter.post('/generate', auth, generateExercise);
exsRouter.delete('/:id', auth, deleteExercise);
export default exsRouter;
//# sourceMappingURL=exercises.js.map