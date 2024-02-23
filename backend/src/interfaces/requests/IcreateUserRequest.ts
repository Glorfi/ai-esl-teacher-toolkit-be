import { Request } from 'express';

interface ISignUpSignInRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export default ISignUpSignInRequest;
