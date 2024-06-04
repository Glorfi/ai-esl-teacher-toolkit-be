import express from 'express';
import {
  createUser,
  generateOtp,
  login,
  verifyOtp,
} from '../controllers/users.js';
import { celebrate } from 'celebrate';
import { authCredentialsConfig } from '../validation/authValidation.js';
import { sendAuthEmail } from '../nodemailer/sendAuthEmail.js';

const regRouter = express.Router();

regRouter.post('/signup', celebrate(authCredentialsConfig), createUser);
regRouter.post('/signin', celebrate(authCredentialsConfig), login);
regRouter.post('/magic', generateOtp, sendAuthEmail);
regRouter.post('/magic/verify', verifyOtp);

export default regRouter;
