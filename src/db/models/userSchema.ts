import mongoose from 'mongoose';
import IUser from '../../interfaces/IUserSchema.js';

const userSchema = new mongoose.Schema<IUser>({
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    required: true,
    default: 'teacher',
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: false,
    select: false,
  },
  exercises: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'exercises',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  latestAuth: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

export default userSchema;
