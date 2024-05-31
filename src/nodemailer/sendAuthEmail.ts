import { NextFunction, Response, Request } from 'express';
import { transporter } from './transporter.js';
interface IAuthRequest extends Request {
  otpInfo?: { email: string; token: string };
}

export const sendAuthEmail = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => { 
  if (req.otpInfo) {
    const { email, token } = req.otpInfo;
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Your OTP',
      text: `Your OTP Token is: ${token}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        next(error);
      } else {
        console.log('Email sent:', info.response);
        res.status(201).send({ message: 'Email has been sent' });
      }
    });
  }
};
