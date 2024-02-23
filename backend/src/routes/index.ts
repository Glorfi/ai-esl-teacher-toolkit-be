import express from 'express';
import usersRouter from './users.js';
import regRouter from './reg.js';
import { auth } from '../middlewares/auth.js';
import exsRouter from './exercises.js';

export const router = express.Router();

router.use('/auth', regRouter);
router.use('/users', auth, usersRouter);
router.use('/exercises', exsRouter);
