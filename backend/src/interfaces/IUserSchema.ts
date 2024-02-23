import mongoose from 'mongoose';

interface IUser extends Document {
  role: 'student' | 'teacher' | 'admin';
  email: string;
  password: string;
  exercises?: [mongoose.Schema.Types.ObjectId];
}

export default IUser;
