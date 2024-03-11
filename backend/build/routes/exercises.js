import express from 'express';
import { createExercise, deleteExercise, generateExercise, getExerciseByID, getUserExercises, updateExercise, } from '../controllers/exercises.js';
import { auth } from '../middlewares/auth.js';
const exsRouter = express.Router();
exsRouter.get('/:id', getExerciseByID);
exsRouter.get('/', auth, getUserExercises);
exsRouter.post('/', auth, createExercise);
exsRouter.post('/generate', auth, generateExercise);
exsRouter.put('/:id', auth, updateExercise);
exsRouter.delete('/:id', auth, deleteExercise);
export default exsRouter;
//# sourceMappingURL=exercises.js.map