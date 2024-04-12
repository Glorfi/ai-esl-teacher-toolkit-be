import { NextFunction, Response } from 'express';
import { Exercises, Sentences } from '../db/mongoConnector.js';
import ISentence from '../interfaces/ISentence.js';
import { NotFound } from '../errors/NotFound.js';
import { GenerationFailed } from '../errors/GenerationFailed.js';
import { UnauthorizedAccess } from '../errors/UnauthorizedAccess.js';

export const updateSentence = (req: any, res: Response, next: NextFunction) => {
  const { sentence: newSent, answer, hint, options } = req.body;
  const { _id: user } = req.user;
  if (!newSent.includes(answer)) {
    throw new GenerationFailed('The sentence does not include answer');
  }
  if (!options.includes(answer)) {
    throw new GenerationFailed('The options do not include answer');
  }
  Sentences.findById(req.params.id)
    .then((sentence: ISentence | null) => {
      if (!sentence) {
        throw new NotFound('The sentence is not found');
      }
      if (newSent) {
        sentence.sentence = newSent;
      }
      if (answer) {
        sentence.answer = answer;
      }
      if (hint) {
        sentence.hint = hint;
      }
      if (options) {
        sentence.options = options;
      }
      return sentence.save();
    })
    .then((sentence) => {
      Exercises.findById(sentence.exercise)
        .then((ex) => {
          if (!ex) {
            throw new NotFound('Exercise not found');
          }
          if (ex.owner.toString() !== user) {
            throw new UnauthorizedAccess(
              'The user tries to update someone else exercise'
            );
          }
          ex.updatedAt = new Date();
          ex.save();
          return sentence;
        })
        .then((sentence) => res.send(sentence));
    })
    .catch((err) => next(err));
};
