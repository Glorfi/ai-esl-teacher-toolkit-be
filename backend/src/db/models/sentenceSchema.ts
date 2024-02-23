import mongoose from 'mongoose';
import ISentence from '../../interfaces/ISentence.js';

const sentenceSchema = new mongoose.Schema<ISentence>({
  sentence: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  hint: { type: String },
  options: [{ type: String }],
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'exercises',
  },
});

export default sentenceSchema;
