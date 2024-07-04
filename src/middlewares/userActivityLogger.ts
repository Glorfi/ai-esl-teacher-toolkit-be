import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces/requests/IRequest.js';
import { logger } from '../logger/logger.js';

export function logUserActivity(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return next();
  }

  logger.info({
    message: `User: ${req.user._id} did ${req.method} at ${req.url}`,
    userID: req.user._id,
    endpoint: req.originalUrl,
    method: req.method,
  });

  return next();
}
