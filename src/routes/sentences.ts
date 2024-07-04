import express from 'express';
import { auth } from '../middlewares/auth.js';
import { updateSentence } from '../controllers/sentences.js';

const sentencesRouter = express.Router();

sentencesRouter.put('/:id', updateSentence);

export default sentencesRouter;
