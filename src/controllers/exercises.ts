import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces/requests/IRequest.js';
import { Exercises, Sentences, Topics, Users } from '../db/mongoConnector.js';
import IExercise from '../interfaces/IExerciseSchema.js';
import ISentence from '../interfaces/ISentence.js';
import { NotFound } from '../errors/NotFound.js';
import { OPEN_AI_BASE_URL } from '../constants/openAI.js';
import { IGptResponse } from '../interfaces/responses/gpt-api.js';
import { openAIRequest } from '../utils/openAIrequest.js';
import { GenerationFailed } from '../errors/GenerationFailed.js';
import { UnauthorizedAccess } from '../errors/UnauthorizedAccess.js';
import { checkExerciseExistance } from '../utils/checkExerciseExistance.js';
import { checkExerciseOwnership } from '../utils/checkExerciseOwnership.js';
import { ITopic } from '../interfaces/ITopicSchema.js';
import { DuplicateError } from '../errors/DuplicateError.js';
import mongoose from 'mongoose';

export const getUserExercises = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;
  Exercises.find({ owner: _id })
    .populate([
      { path: 'sentenceList', model: 'sentences' },
      { path: 'topicList', model: 'topics' }, // Добавлено здесь
    ])
    .then((exs: IExercise[]) => {
      res.send(exs);
    });
};

export const getExerciseByID = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  Exercises.findById(req.params.id)
    .populate([
      { path: 'sentenceList', model: 'sentences' },
      { path: 'topicList', model: 'topics' },
    ])
    .then((ex: IExercise | null) => {
      if (!ex) {
        throw new NotFound('Exercise is not found');
      }
      ex.views += 1;
      return ex.save();
    })
    .then((ex) => res.send(ex))
    .catch((err) => next(err));
};

export const createExercise = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { _id: owner } = req.user;
  const { skill, type, sentenceList } = req.body;
  Exercises.create({ owner, skill, type })
    .then((ex: any) => {
      Users.findById(owner)
        .then((user: any | null) => {
          if (!user) {
            throw new NotFound("User's not found");
          }
          user.exercises?.push(ex._id);
          return user.save();
        })
        .catch((err) => next(err));
      const sentencePromises = sentenceList.map((item: ISentence) => {
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
        .then(() =>
          ex.populate('sentenceList').then((newEx: any) => res.send(newEx))
        );
    })
    .catch((err) => next(err));
};

export const generateExercise = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { _id: owner } = req.user;
  const { prompt, skill, type, studentLevel, studentAge, isStrictChecking } =
    req.body;
  let taskDescription: string;
  openAIRequest(prompt)
    .then((sentenceList: ISentence[]) => {
      if (!Array.isArray(sentenceList)) {
        throw new GenerationFailed(
          'Please try again! AI returned wrong exercise structure.'
        );
      }
      const isSentenceIncludeAnswer = sentenceList.every((item) =>
        item.sentence.includes(item.answer)
      );
      const areOptionsIncludeAnswer = sentenceList.every((item) =>
        item.options?.includes(item.answer)
      );
      if (!isSentenceIncludeAnswer && isStrictChecking) {
        throw new GenerationFailed(
          'Please, try again! The exercise is missing answer in the sentence. Alternatively, try to disable strict checking.'
        );
      }
      if (
        !areOptionsIncludeAnswer &&
        isStrictChecking &&
        type !== 'fillInGaps'
      ) {
        throw new GenerationFailed(
          'Please, try again! The exercise is missing answer in the options. Alternatively, try to disable strict checking.'
        );
      }
      if (type === 'multipleChoice') {
        taskDescription = 'Choose the correct option to complete the sentences';
      }
      if (type === 'fillInGaps') {
        taskDescription = 'Fill the gaps with the correct word';
      }
      Exercises.create({
        owner,
        skill,
        type,
        taskDescription,
        studentAge,
        studentLevel,
      }).then((ex: any) => {
        Users.findById(owner)
          .then((user: any | null) => {
            if (!user) {
              throw new NotFound("User's not found");
            }
            user.exercises?.push(ex._id);
            return user.save();
          })
          .catch((err) => next(err));
        const sentencePromises = sentenceList.map((item: ISentence) => {
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
          .then(() =>
            ex.populate('sentenceList').then((newEx: any) => res.send(newEx))
          );
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

export const deleteExercise = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  let removedEx: IExercise | null;

  Exercises.findByIdAndDelete(req.params.id)
    .then((removedData: IExercise | null) => {
      if (!removedData) {
        throw new NotFound('Exercise not found');
      }
      removedEx = removedData;

      return Sentences.find({ exercise: req.params.id });
    })
    .then((sentenceList: ISentence[]) => {
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

export const updateExercise = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, taskDescription, isRandomOrderEnabled } = req.body;
  const { _id: user } = req.user;
  Exercises.findById(req.params.id)
    .then((ex: IExercise | null) => {
      if (!ex) {
        throw new NotFound('Exercise not found');
      }
      if (ex.owner.toString() !== user) {
        throw new UnauthorizedAccess(
          'The user tries to update someone else exercise'
        );
      }
      if (title) {
        ex.title = title;
      }
      if (taskDescription) {
        ex.taskDescription = taskDescription;
      }
      if (isRandomOrderEnabled !== undefined) {
        ex.isRandomOrderEnabled = isRandomOrderEnabled;
      }
      ex.updatedAt = new Date();
      return ex.save();
    })
    .then((updatedEx) =>
      updatedEx
        .populate([
          { path: 'sentenceList', model: 'sentences' },
          { path: 'topicList', model: 'topics' },
        ])
        .then((newEx: any) => res.send(newEx))
    )
    .catch((err) => next(err));
};

export const addTopicToExercise = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { _id: user } = req.user;
  const { skill, name, exerciseId, topicId } = req.body;
  if (topicId && exerciseId) {
    Exercises.findById(exerciseId)
      .then((ex: IExercise | null) => {
        if (!ex) {
          throw new NotFound('Exercise not found');
        }
        checkExerciseOwnership(ex, user);
        return Topics.findById(topicId)
          .then((topic) => {
            if (!topic) {
              throw new NotFound('Topic not found');
            }
            if (
              ex.topicList.some(
                (item) => item.toString() === topic._id.toString()
              )
            ) {
              throw new DuplicateError('The exercise already has this topic');
            }
            ex.topicList.push(topic._id);
            ex.updatedAt = new Date();
            return ex.save();
          })
          .then((updatedEx) =>
            updatedEx
              .populate([
                { path: 'sentenceList', model: 'sentences' },
                { path: 'topicList', model: 'topics' },
              ])
              .then((newEx: any) => res.send(newEx))
          );
      })
      .catch((err) => next(err));
  } else {
    Exercises.findById(exerciseId)
      .then((ex: IExercise | null) => {
        if (!ex) {
          throw new NotFound('Exercise not found');
        }
        checkExerciseOwnership(ex, user);
        return Topics.findOne({ name: name })
          .then((topic) => {
            if (!topic) {
              return Topics.create({ skill: skill, name: name }).then(
                (createdTopic) => {
                  ex.topicList.push(createdTopic._id);
                  ex.updatedAt = new Date();
                  return ex.save();
                }
              );
            }
            if (
              ex.topicList.some(
                (item) => item.toString() === topic._id.toString()
              )
            ) {
              throw new DuplicateError('The exercise already has this topic');
            }
            ex.topicList.push(topic._id);
            ex.updatedAt = new Date();
            return ex.save();
          })
          .then((updatedEx) =>
            updatedEx
              .populate([
                { path: 'sentenceList', model: 'sentences' },
                { path: 'topicList', model: 'topics' },
              ])
              .then((newEx: any) => res.send(newEx))
          );
      })
      .catch((err) => next(err));
  }
};

export const removeTopicFromExercise = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { exId, topicId } = req.params;

  Exercises.findByIdAndUpdate(
    exId,
    {
      $pull: { topicList: topicId },
      $set: { updatedAt: new Date() },
    },
    { new: true }
  )
    .populate([
      { path: 'sentenceList', model: 'sentences' },
      { path: 'topicList', model: 'topics' },
    ])
    .then((updatedEx) => {
      if (!updatedEx) {
        throw new NotFound('Exercise not found');
      }
      res.send(updatedEx);
    })
    .catch((err) => next(err));
};

// const updatedTopicList = ex.topicList.filter(
//   (topic) => topic.toString() !== topicId.toString()
// );
// ex.topicList = updatedTopicList;
// ex.updatedAt = new Date();
// return ex.save();
// })
// .then((updatedEx) => {
// if (!updatedEx) {
//   throw new NotFound('Exercise not found');
// }
// updatedEx
//   .populate([
//     { path: 'sentenceList', model: 'sentences' },
//     { path: 'topicList', model: 'topics' },
//   ])
//   .then((newEx) => res.send(newEx));
// })

// .catch((err) => next(err));
