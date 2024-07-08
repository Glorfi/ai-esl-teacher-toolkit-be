import mongoose from 'mongoose';

interface IUser extends Document {
  role: 'student' | 'teacher' | 'admin';
  email: string;
  password: string;
  exercises?: [mongoose.Schema.Types.ObjectId];
  createdAt: Date,
  latestAuth: Date,
}

export default IUser;
