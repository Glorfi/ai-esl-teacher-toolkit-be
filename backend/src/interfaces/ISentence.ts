import { Document, Types } from 'mongoose';
interface ISentence extends Document {
  sentence: string;
  answer: string;
  hint?: string;
  options?: string[];
  exercise: Types.ObjectId | string;
}

export default ISentence;
