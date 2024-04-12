import { UnauthorizedAccess } from '../errors/UnauthorizedAccess.js';
export function checkExerciseOwnership(exercise, userId) {
    if (exercise && exercise.owner.toString() !== userId) {
        throw new UnauthorizedAccess('The user tries to update someone else exercise');
    }
    return;
}
//# sourceMappingURL=checkExerciseOwnership.js.map