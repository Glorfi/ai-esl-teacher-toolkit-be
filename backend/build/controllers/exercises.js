import { Exercises, Sentences, Users } from '../db/mongoConnector.js';
import { NotFound } from '../errors/NotFound.js';
export const getUserExercises = (req, res, next) => {
    const { _id } = req.user;
    Exercises.find({ owner: _id })
        .populate('sentenceList')
        .then((exs) => {
        res.send(exs);
    });
};
export const getExerciseByID = (req, res, next) => {
    Exercises.findById(req.params.id)
        .populate('sentenceList')
        .then((ex) => {
        if (!ex) {
            throw new NotFound('Exercise is not found');
        }
        res.send(ex);
    })
        .catch((err) => next(err));
};
export const createExercise = (req, res, next) => {
    const { _id: owner } = req.user;
    const { skill, type, sentenceList } = req.body;
    Exercises.create({ owner, skill, type })
        .then((ex) => {
        Users.findById(owner)
            .then((user) => {
            if (!user) {
                throw new NotFound("User's not found");
            }
            user.exercises?.push(ex._id);
            return user.save();
        })
            .catch((err) => next(err));
        const sentencePromises = sentenceList.map((item) => {
            const exId = ex._id;
            const { sentence, answer, hint, options } = item;
            return Sentences.create({
                sentence,
                answer,
                hint,
                options,
                exercise: exId,
            });
        });
        return Promise.all(sentencePromises)
            .then((sentences) => {
            ex.sentenceList = sentences.map((sentence) => sentence._id);
            return ex.save();
        })
            .then(() => ex.populate('sentenceList').then((newEx) => res.send(newEx)));
    })
        .catch((err) => next(err));
};
export const deleteExercise = (req, res, next) => {
    let removedEx;
    Exercises.findByIdAndDelete(req.params.id)
        .then((removedData) => {
        if (!removedData) {
            throw new NotFound('Exercise not found');
        }
        removedEx = removedData;
        return Sentences.find({ exercise: req.params.id });
    })
        .then((sentenceList) => {
        const sentenceIdList = sentenceList.map((sentence) => sentence._id);
        return Sentences.deleteMany({ _id: { $in: sentenceIdList } });
    })
        .then(() => {
        return Users.findByIdAndUpdate(req.user._id, {
            $pull: { exercises: req.params.id },
        });
    })
        .then((user) => {
        if (!user) {
            throw new NotFound('User not found');
        }
        res.send(removedEx);
        return user.save();
    })
        .catch((err) => next(err));
};
//# sourceMappingURL=exercises.js.map