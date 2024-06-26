import { Document, Schema } from 'mongoose';

interface IExercise extends Document {
  owner: Schema.Types.ObjectId;
  skill: 'grammar' | 'vocabulary';
  type: 'fillInGaps' | 'multipleChoice';
  createdAt: Date;
  updatedAt: Date;
  sentenceList: [Schema.Types.ObjectId];
  topicList: Schema.Types.ObjectId[];
  title?: string;
  taskDescription?: string;
  studentLevel?: string;
  studentAge?: number;
  views: number;
  isRandomOrderEnabled?: boolean;
}

export default IExercise;
