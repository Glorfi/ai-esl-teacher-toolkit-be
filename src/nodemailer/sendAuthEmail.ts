import { NextFunction, Response, Request } from 'express';
import { transporter } from './transporter.js';
import { BadRequest } from '../errors/BadRequest.js';
interface IAuthRequest extends Request {
  otpInfo?: { email: string; token: string, newUser: boolean };
}

const isProduction = process.env.NODE_ENV === 'production';

export const sendAuthEmail = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.otpInfo) {
    throw new BadRequest("Request doesn't contain email and token fields");
  }
  const { email, token, newUser } = req.otpInfo;
  let host: string = '';
  if (req.headers.origin) {
    host = req.headers.origin;
  } else {
    host = 'http://localhost:3050';
  }
  const link = `${host}/auth/magic?email=${email}&token=${token}`;
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: newUser ? 'Welcome to ESL Teacher Toolkit' : "Login for ESL Teacher Toolkit",
    text: `Your OTP Token is: ${token}, Your magic link: ${link}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      next(error);
    } else {
      console.log('Email sent:', info.response);
      res.status(201).send({ message: 'Email has been sent' });
    }
  });
};
