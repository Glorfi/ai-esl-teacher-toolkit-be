import { Document, ObjectId } from 'mongoose';

export interface ITopic extends Document {
  skill: string;
  name: string;
}
