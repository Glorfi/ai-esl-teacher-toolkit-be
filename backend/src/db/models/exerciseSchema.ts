import mongoose from 'mongoose';
import IExercise from '../../interfaces/IExerciseSchema.js';

const exerciseSchema = new mongoose.Schema<IExercise>({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  skill: {
    type: String,
    enum: ['grammar', 'vocabulary'],
    required: true,
  },
  type: {
    type: String,
    enum: ['fillInGaps', 'multipleChoice'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  sentenceList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'sentences',
    required: false,
  },

  title: {
    type: String,
    required: false,
  },
  taskDescription: {
    type: String,
    required: false,
  },
  studentLevel: {
    type: String,
    required: false,
  },
  studentAge: {
    type: Number,
    required: false,
  },
});

export default exerciseSchema;
