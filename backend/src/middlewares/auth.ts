import { Request, Response, NextFunction, RequestHandler } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { AuthorizationRequired } from '../errors/AuthorizationRequired.js';
import { IRequest } from '../interfaces/requests/IRequest.js';

interface AuthRequest extends Request {
  user?: any; // Define the user property here based on your payload structure
}

export const auth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    throw new AuthorizationRequired('Authorization Required');
  }
  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    throw new AuthorizationRequired('Authorization Required');
  }
  let payload;
  try {
    payload = jsonwebtoken.verify(token, 'supersecret');
  } catch (error) {
    throw new AuthorizationRequired('Authorization Required');
  }
  req.user = payload;
  return next();
};

// Declare a custom middleware type to handle IRequest

// export const authMiddleware: any = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // Cast req to IRequest
//   const customReq = req as IRequest;
//   // Call the original auth middleware
//   auth(customReq, res, next);
// };
