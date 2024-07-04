import express from 'express';
import usersRouter from './users.js';
import regRouter from './reg.js';
import { auth } from '../middlewares/auth.js';
import exsRouter from './exercises.js';
import sentencesRouter from './sentences.js';
import topicsRouter from './topics.js';
import { logUserActivity } from '../middlewares/userActivityLogger.js';

export const router = express.Router();

router.use('/auth', regRouter);
router.use('/users', auth, usersRouter);
router.use('/exercises', exsRouter);
router.use('/sentences', auth, sentencesRouter);
router.use('/topics', auth, topicsRouter);
//router.get('/crash', () => {throw new Error("Я упал подними меня")})
