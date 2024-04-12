import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces/requests/IRequest.js';
import { Topics } from '../db/mongoConnector.js';
import { calculateSimilarityCoefficient } from '../utils/calculateSimilarityCoefficient.js';

export const createTopic = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, skill } = req.body;
  Topics.create({ name, skill })
    .then((topic) => res.status(201).send(topic))
    .catch((err) => next(err));
};

export const getAutocompleteTopicList = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.query;

  if (!name) {
    return res.send([]);
  }

  const regex = new RegExp(`${name}`, 'i');

  Topics.find({ name: regex })
    .then((results) => {
      const sortedResults = results.map((result) => {
        const similarityCoefficient = calculateSimilarityCoefficient(
          name,
          result.name
        );
        return { result, similarityCoefficient };
      });
      sortedResults.sort(
        (a, b) => b.similarityCoefficient - a.similarityCoefficient
      );
      const sortedResultsOnly = sortedResults.map((item) => item.result);
      res.send(sortedResultsOnly);
    })
    .catch((err) => {
      next(err);
    });
};

// {
//   $search: {
//     index: 'autocomplete', // optional, defaults to "default"
//     autocomplete: {
//       query: name,
//       path: 'name',
//       tokenOrder: 'sequential',
//       fuzzy: {
//         maxEdits: 1,
//       },
//     },
//   },
// },
// {
//   $limit: 10,
// },
