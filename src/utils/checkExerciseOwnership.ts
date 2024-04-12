import { UnauthorizedAccess } from '../errors/UnauthorizedAccess.js';
import IExercise from '../interfaces/IExerciseSchema.js';

export function checkExerciseOwnership(
  exercise: IExercise | null,
  userId: string
) {
  if (exercise && exercise.owner.toString() !== userId) {
    throw new UnauthorizedAccess(
      'The user tries to update someone else exercise'
    );
  }
  return;
}
