import { Exercises, Sentences, Users } from '../db/mongoConnector.js';
import { NotFound } from '../errors/NotFound.js';
import { openAIRequest } from '../utils/openAIrequest.js';
import { GenerationFailed } from '../errors/GenerationFailed.js';
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
export const generateExercise = (req, res, next) => {
    const { _id: owner } = req.user;
    const { prompt, skill, type } = req.body;
    openAIRequest(prompt)
        .then((sentenceList) => {
        if (!Array.isArray(sentenceList)) {
            throw new GenerationFailed('AI returned non-array data structure');
        }
        const isSentenceListValid = sentenceList.every((item) => item.sentence.includes(item.answer));
        if (!isSentenceListValid) {
            throw new GenerationFailed('AI returned wrong data structure');
        }
        Exercises.create({ owner, skill, type }).then((ex) => {
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
        });
    })
        .catch((err) => next(err));
    // fetch(OPEN_AI_BASE_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-3.5-turbo',
    //     messages: [{ role: 'user', content: prompt }],
    //     temperature: 1,
    //     max_tokens: 500,
    //   }),
    // })
    //   .then((gptData) => gptData.json())
    //   .then((gptRes: IGptResponse) => {
    //     const gptMessageString = gptRes.choices[0].message.content;
    //     return gptMessageString;
    //   })
    //   .catch((err) => {
    //     next(err);
    //   });
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