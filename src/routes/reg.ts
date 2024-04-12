import express from 'express';
import { createUser, login } from '../controllers/users.js';
import { celebrate } from 'celebrate';
import { authCredentialsConfig } from '../validation/authValidation.js';

const regRouter = express.Router();

regRouter.post('/signup', celebrate(authCredentialsConfig), createUser);
regRouter.post('/signin', celebrate(authCredentialsConfig), login)

export default regRouter;
