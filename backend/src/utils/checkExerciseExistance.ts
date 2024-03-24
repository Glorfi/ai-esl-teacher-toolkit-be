import { NotFound } from '../errors/NotFound.js';
import IExercise from '../interfaces/IExerciseSchema.js';

export function checkExerciseExistance(exercise: IExercise | null) {
  if (!exercise) {
    throw new NotFound('Exercise not found');
  }
  return;
}
