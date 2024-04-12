import mongoose from 'mongoose';
import { ITopic } from '../../interfaces/ITopicSchema.js';

const topicSchema = new mongoose.Schema<ITopic>({
  skill: {
    type: String,
    enum: ['grammar', 'vocabulary'],
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default topicSchema;
