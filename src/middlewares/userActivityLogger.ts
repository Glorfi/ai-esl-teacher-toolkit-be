import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces/requests/IRequest.js';

import jsonwebtoken from 'jsonwebtoken';
import logger from '../../api/logger.js';

interface IUserPayload {
  _id: string;
  // любые другие поля, которые есть в вашем токене
}

export function logUserActivity(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split(' ')[1];
  if (!token) {
    logger.info({
      message: `Visitor did ${req.method} at ${req.url}`,
      userID: null,
      endpoint: req.originalUrl,
      method: req.method,
    });
    return next();
  }
  let user;
  try {
    const secret: string = process.env.JWT_SECRET || 'supersecret';
    user = jsonwebtoken.verify(token, secret) as IUserPayload;
    logger.info({
      message: `User ${user?._id} did ${req.method} at ${req.url}`,
      userID: user?._id,
      endpoint: req.originalUrl,
      method: req.method,
    });
    return next();
  } catch (error) {
    return next();
  }
}
