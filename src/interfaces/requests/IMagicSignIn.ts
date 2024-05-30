import { Request } from 'express';

export interface IMagicSignIn extends Request {
  otpInfo?: { email: string; token: string };
  body: {
    email: string;
  };
}
