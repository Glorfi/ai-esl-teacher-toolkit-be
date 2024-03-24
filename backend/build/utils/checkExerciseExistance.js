import { NotFound } from '../errors/NotFound.js';
export function checkExerciseExistance(exercise) {
    if (!exercise) {
        throw new NotFound('Exercise not found');
    }
    return;
}
//# sourceMappingURL=checkExerciseExistance.js.map