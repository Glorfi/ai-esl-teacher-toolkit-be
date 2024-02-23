import express from 'express';

import { getCurrentUser } from '../controllers/users.js';

const usersRouter = express.Router();

usersRouter.get('/me', getCurrentUser);

export default usersRouter;
