import express from 'express';
import { auth } from '../middlewares/auth.js';
import {
  createTopic,
  getAutocompleteTopicList,
} from '../controllers/topics.js';

const topicsRouter = express.Router();

topicsRouter.post('/', auth, createTopic);
topicsRouter.get('/autocomplete', auth, getAutocompleteTopicList);

export default topicsRouter;
