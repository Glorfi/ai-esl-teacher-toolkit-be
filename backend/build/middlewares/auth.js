import jsonwebtoken from 'jsonwebtoken';
import { AuthorizationRequired } from '../errors/AuthorizationRequired.js';
export const auth = (req, res, next) => {
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
    }
    catch (error) {
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
//# sourceMappingURL=auth.js.map