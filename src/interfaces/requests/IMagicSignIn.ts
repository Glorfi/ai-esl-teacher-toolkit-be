import { Request } from 'express';

export interface IMagicSignIn extends Request {
  otpInfo?: { email: string; token: string, newUser: boolean };
  body: {
    email: string;
  };
}
